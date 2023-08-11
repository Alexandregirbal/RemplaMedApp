import Google from "next-auth/providers/google";
import { env } from "../../../../env.mjs";

const googleProvider = Google({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
});

export default googleProvider;
