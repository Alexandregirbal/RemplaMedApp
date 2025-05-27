import { PostIntent } from "server/database/models/post/types";

export const getPostIntentLabel = (postIntent: PostIntent): string => {
    switch (postIntent) {
        case PostIntent.replacementOffer:
            return "Remplacement infirmier libéral";
        case PostIntent.replacementSearch:
            return "Remplaçant infirmier libéral";
        case PostIntent.partnership:
            return "Collaboration cabinet infirmier libéral";
        case PostIntent.transaction:
            return "Cession de cabinet infirmier libéral";
        case PostIntent.other:
            return "Autre demande";
        default:
            throw new Error("Invalid post intent");
    }
};
