const HIDE_ELEMENT = "*";

/**
 * Private information such as phone number, email are hidden
 * @param content The message content that must be protectedd
 * @returns The message content with private informations hidden
 */
export const hidePrivateInformations = (content: string) => {
    if (!content) {
        return content;
    }
    const phoneRegex = /(\+33|0|0033)([1-9])(.*(?:[0-9]{2}.*){3})([0-9]{2})/g;
    const phoneNumberMatches = phoneRegex.exec(content);
    let phoneReplacement = HIDE_ELEMENT.repeat(10);

    if (
        phoneNumberMatches &&
        phoneNumberMatches[1] &&
        phoneNumberMatches[2] &&
        phoneNumberMatches[3] &&
        phoneNumberMatches[4]
    ) {
        phoneReplacement = `${phoneNumberMatches[1]}${
            phoneNumberMatches[2]
        }${HIDE_ELEMENT.repeat(phoneNumberMatches[3].length)}${
            phoneNumberMatches[4]
        }`;
    }

    const emailRegex = /([a-zA-Z0-9._-]+)(@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
    let emailReplacement = "*****@gmail.com";
    const emailMatches = emailRegex.exec(content);
    if (emailMatches && emailMatches[1] && emailMatches[2]) {
        emailReplacement = `${HIDE_ELEMENT.repeat(emailMatches[1].length)}${
            emailMatches[2]
        }`;
    }

    const result = content
        .replace(emailRegex, emailReplacement)
        .replace(phoneRegex, phoneReplacement);

    return result;
};
