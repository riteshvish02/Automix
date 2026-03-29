import { getGmailClient } from "../../providers/google/gmail.client";

interface GmailSearchEmailsInput {
	userId: string;
	query?: string;
	maxResults?: number;
}

export const gmailSearchEmails = async ({ userId, query = "", maxResults = 10 }: GmailSearchEmailsInput) => {
	const gmail = await getGmailClient(userId);
	const res = await gmail.users.messages.list({
		userId: "me",
		q: query,
		maxResults,
	});
	const messages = res.data.messages || [];
	return { messages };
};
