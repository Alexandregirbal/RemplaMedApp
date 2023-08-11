import NextAuth from "next-auth";
import authOptions from "modules/auth/server/options";

export default NextAuth(authOptions);
