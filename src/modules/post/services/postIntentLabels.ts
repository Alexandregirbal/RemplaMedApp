import { PostIntent } from "@prisma/client";

export const getPostIntentLabel = (postIntent: PostIntent): string => {
    switch (postIntent) {
        case PostIntent.replacementOffer:
            return "Cherche remplaçant(e)";
        case PostIntent.replacementSearch:
            return "Cherche remplacement";
        case PostIntent.partnership:
            return "Cherche collaboration";
        case PostIntent.transaction:
            return "Cession de cabinet";
        case PostIntent.other:
            return "Autre";
        default:
            throw new Error("Invalid post intent");
    }
};
