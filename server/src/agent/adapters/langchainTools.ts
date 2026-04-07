import { tool } from "langchain";
import * as z from "zod";
import { TOOL_REGISTRY } from "../../tools/registry/toolRegistry";
import { executeTool } from "../../tools/runtime/executeTool";
import { getAgentContext } from "../context/agentRunContext";

const isCalendarCreateTool = (toolName: string) => {
  return toolName === "calendar_create_event" || toolName === "calendar_create_meet_event";
};

const extractDateInTimeZone = (timeZone: string, baseDate: Date) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(baseDate);

  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;

  if (!year || !month || !day) {
    return null;
  }

  return `${year}-${month}-${day}`;
};

const maybeNormalizeRelativeCalendarDates = (args: any, originalPrompt: string) => {
  if (!args?.start?.dateTime) {
    return args;
  }

  const prompt = originalPrompt.toLowerCase();
  const hasTomorrow = prompt.includes("tomorrow");
  const hasToday = prompt.includes("today");

  if (!hasTomorrow && !hasToday) {
    return args;
  }

  const tz = args?.start?.timeZone || args?.end?.timeZone || "UTC";
  const offsetDays = hasTomorrow ? 1 : 0;
  const base = new Date(Date.now() + offsetDays * 24 * 60 * 60 * 1000);
  const normalizedDate = extractDateInTimeZone(tz, base);

  if (!normalizedDate) {
    return args;
  }

  const applyDate = (dateTime?: string) => {
    if (!dateTime || !dateTime.includes("T")) {
      return dateTime;
    }
    const timePart = dateTime.split("T")[1];
    return `${normalizedDate}T${timePart}`;
  };

  return {
    ...args,
    start: {
      ...(args.start || {}),
      dateTime: applyDate(args.start?.dateTime),
    },
    end: {
      ...(args.end || {}),
      dateTime: applyDate(args.end?.dateTime),
    },
  };
};

const toZodType = (schema: any): z.ZodTypeAny => {
  if (!schema || typeof schema !== "object") {
    return z.any();
  }

  const type = schema.type;

  if (type === "string") return z.string();
  if (type === "integer" || type === "number") return z.number();
  if (type === "boolean") return z.boolean();

  if (type === "array") {
    const itemSchema = schema.items ? toZodType(schema.items) : z.any();
    return z.array(itemSchema);
  }

  if (type === "object") {
    const properties = schema.properties || {};
    const shape: Record<string, z.ZodTypeAny> = {};
    for (const [key, value] of Object.entries(properties)) {
      let field = toZodType(value);
      const isNullable = (value as any)?.nullable === true;
      if (isNullable) {
        field = field.nullable().optional();
      }
      shape[key] = field;
    }
    return z.object(shape).passthrough();
  }

  return z.any();
};

const buildToolSchema = (inputSchema: Record<string, any>) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const [key, def] of Object.entries(inputSchema || {})) {
    let field = toZodType(def);
    const isNullable = (def as any)?.nullable === true;
    const isRequired = !isNullable;

    if (!isRequired) {
      field = field.optional();
    }

    shape[key] = field;
  }

  return z.object(shape).passthrough();
};

export const LANGCHAIN_TOOLS = Object.values(TOOL_REGISTRY).map((def) =>
  tool(
    async (args) => {
      const { userId, originalPrompt } = getAgentContext();

      try {
        const normalizedArgs = isCalendarCreateTool(def.name)
          ? maybeNormalizeRelativeCalendarDates(args, originalPrompt)
          : args;

        const result = await executeTool({
          toolName: def.name,
          args: normalizedArgs,
          userId,
        });
        return JSON.stringify({ ok: true, result });
      } catch (error: any) {
        return JSON.stringify({
          ok: false,
          error: error?.message || "Tool execution failed",
        });
      }
    },
    {
      name: def.name,
      description: def.description,
      schema: buildToolSchema(def.inputSchema || {}),
    }
  )
);
