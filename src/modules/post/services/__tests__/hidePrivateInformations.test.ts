import { hidePrivateInformations } from "../hidePrivateInformations";

describe("hidePrivateInformations", () => {
    it("should return empty string when content is empty", () => {
        expect(hidePrivateInformations("")).toEqual("");
    });

    it("should hide phone number no matter the message around it", () => {
        const messages = [
            "Around 0623456789, around",
            "0623456789 begin",
            "end 0623456789",
            "0623456789",
        ];
        const hiddenMessages = messages.map(hidePrivateInformations);
        for (const message of hiddenMessages) {
            expect(message).toContain("06******89");
        }
    });

    it("should hide phone number when it is at the beginning with 07", () => {
        expect(hidePrivateInformations("0723456789")).toEqual("07******89");
    });

    it("should hide phone number when it is at the beginning with 00336", () => {
        expect(hidePrivateInformations("0033623456789")).toEqual(
            "00336******89"
        );
    });

    it("should hide phone number when it is at the beginning with +336", () => {
        expect(hidePrivateInformations("+33623456789")).toEqual("+336******89");
    });

    it("should hide phone number when it is at the beginning with +337", () => {
        expect(hidePrivateInformations("+33723456789")).toEqual("+337******89");
    });

    it("should handle different phone number formats", () => {
        const messageWithSpaces = "06 23 45 67 89";
        const messageWithDots = "06.23.45.67.89";
        expect(hidePrivateInformations(messageWithSpaces)).toEqual(
            "06**********89"
        );
        expect(hidePrivateInformations(messageWithDots)).toEqual(
            "06**********89"
        );
    });
});
