/**
 *Private information such as phone number, email are hidden
 * @param content The message content that must be protectedd
 * @returns The message content with private informations hidden
 */
export const hidePrivateInformations = (content: string) => {
    const regex = /@([a-zA-Z0-9_]+)/g;
    return content.replace(regex, "[**********]");
};
