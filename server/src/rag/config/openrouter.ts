// server/src/rag/config/openrouter.ts — Centralized OpenRouter Client for RAG

import OpenAI from "openai";

const getOpenRouterApiKey = (): string => {
  const key =
    process.env.OPENROUTER_API_KEY ||
    (process.env.OPENAI_API_KEY?.startsWith("sk-or-") ? process.env.OPENAI_API_KEY : "");
  if (!key) {
    console.warn("⚠️ Warning: OPENROUTER_API_KEY is not set in environment");
  }
  return key;
};

// OpenRouter uses standard OpenAI SDK with custom baseURL and headers
export const openRouterClient = new OpenAI({
  apiKey: getOpenRouterApiKey() || "dummy-key",
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:4000",
    "X-Title": "Automix Agent RAG",
  },
});

export const OPENROUTER_CONFIG = {
  chatModel: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
  embeddingModel: process.env.OPENROUTER_EMBEDDING_MODEL || "openai/text-embedding-3-small",
  embeddingDimension: 1536,
};

/**
 * Generate dense embedding using OpenRouter / OpenAI embeddings API
 */
export async function generateDenseEmbedding(text: string): Promise<number[]> {
  try {
    const cleanInput = text.replace(/\n+/g, " ").trim().substring(0, 8000);
    const response = await openRouterClient.embeddings.create({
      model: OPENROUTER_CONFIG.embeddingModel,
      input: cleanInput,
    });

    if (!response.data || response.data.length === 0) {
      throw new Error("Empty embedding response from OpenRouter");
    }

    return response.data[0].embedding;
  } catch (error: any) {
    console.error("OpenRouter embedding failed:", error?.message || error);
    throw new Error(`Embedding generation error: ${error?.message || error}`);
  }
}

/**
 * Batch generate dense embeddings with concurrency throttling
 */
export async function generateBatchDenseEmbeddings(
  texts: string[],
  batchSize: number = 8
): Promise<number[][]> {
  const embeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const cleanedBatch = batch.map((t) => t.replace(/\n+/g, " ").trim().substring(0, 8000));

    try {
      const response = await openRouterClient.embeddings.create({
        model: OPENROUTER_CONFIG.embeddingModel,
        input: cleanedBatch,
      });

      // Sort by index in case API returns unsorted
      const sorted = response.data.sort((a, b) => a.index - b.index);
      for (const item of sorted) {
        embeddings.push(item.embedding);
      }
    } catch (batchErr: any) {
      console.warn(`Batch embedding fallback for index ${i}:`, batchErr?.message);
      // Fallback: process individually
      for (const item of cleanedBatch) {
        const single = await generateDenseEmbedding(item);
        embeddings.push(single);
      }
    }

    // Small delay between batches to respect rate limits
    if (i + batchSize < texts.length) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  return embeddings;
}

/**
 * Extract structured JSON using OpenRouter
 */
export async function completeJson<T = any>(
  systemPrompt: string,
  userPrompt: string
): Promise<T> {
  const response = await openRouterClient.chat.completions.create({
    model: OPENROUTER_CONFIG.chatModel,
    temperature: 0.1,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response content from OpenRouter");
  }

  try {
    return JSON.parse(content) as T;
  } catch {
    // Attempt markdown json block extraction
    const match = content.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]) as T;
    }
    throw new Error(`Failed to parse JSON response: ${content.substring(0, 100)}...`);
  }
}

/**
 * Standard chat completion for RAG synthesis
 */
export async function completeRAGAnswer(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const response = await openRouterClient.chat.completions.create({
    model: OPENROUTER_CONFIG.chatModel,
    temperature: 0.2,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0]?.message?.content || "";
}
