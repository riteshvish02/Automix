import { getGmailClient } from "../../providers/google/gmail.client";
import { gmail_v1 } from "googleapis";

interface GmailSearchEmailsInput {
	userId: string;
	query?: string;
	maxResults?: number;
	labelIds?: string[];
	includeDetails?: boolean;
}

const getHeader = (
	headers: gmail_v1.Schema$MessagePartHeader[] | undefined,
	key: string
) => {
	return headers?.find((h) => h.name?.toLowerCase() === key.toLowerCase())?.value;
};

export const gmailSearchEmails = async ({
	userId,
	query = "",
	maxResults = 10,
	labelIds,
	includeDetails = true,
}: GmailSearchEmailsInput) => {
	const gmail = await getGmailClient(userId);
	const res = await gmail.users.messages.list({
		userId: "me",
		q: query,
		labelIds,
		maxResults,
	});
	const messages = res.data.messages || [];

	if (!includeDetails || messages.length === 0) {
		return { messages };
	}

	const detailedMessages = await Promise.all(
		messages
			.filter((m) => !!m.id)
			.map(async (m) => {
				const detail = await gmail.users.messages.get({
					userId: "me",
					id: m.id as string,
					format: "metadata",
					metadataHeaders: ["From", "To", "Subject", "Date"],
				});

				const data = detail.data;
				const headers = data.payload?.headers;

				return {
					id: data.id,
					threadId: data.threadId,
					snippet: data.snippet,
					internalDate: data.internalDate,
					from: getHeader(headers, "From"),
					to: getHeader(headers, "To"),
					subject: getHeader(headers, "Subject"),
					date: getHeader(headers, "Date"),
					labelIds: data.labelIds,
				};
			})
	);

	return { messages: detailedMessages };
};
