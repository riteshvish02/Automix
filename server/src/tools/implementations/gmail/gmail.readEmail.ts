import { getGmailClient } from "../../providers/google/gmail.client";
import { ErrorHandler } from "../../../utils/ErrorHandler";

interface GmailReadEmailInput {
	userId: string;
	messageId?: string;
	id?: string;
}

export const gmailReadEmail = async ({ userId, messageId, id }: GmailReadEmailInput) => {
	const resolvedMessageId = messageId || id;
	if (!resolvedMessageId) {
		throw new ErrorHandler("Missing required parameters: messageId (or id)", 400);
	}

	const gmail = await getGmailClient(userId);
	const res = await gmail.users.messages.get({
		userId: "me",
		id: resolvedMessageId,
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
