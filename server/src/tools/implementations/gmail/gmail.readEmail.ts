import { getGmailClient } from "../../providers/google/gmail.client";

interface GmailReadEmailInput {
	userId: string;
	messageId: string;
}

export const gmailReadEmail = async ({ userId, messageId }: GmailReadEmailInput) => {
	const gmail = await getGmailClient(userId);
	const res = await gmail.users.messages.get({
		userId: "me",
		id: messageId,
		format: "full",
	});
	return {
		id: res.data.id,
		threadId: res.data.threadId,
		snippet: res.data.snippet,
		payload: res.data.payload,
		labelIds: res.data.labelIds,
	};
};
