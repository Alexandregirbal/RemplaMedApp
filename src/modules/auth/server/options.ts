import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import { env } from "../../../env.mjs";
import { prisma } from "../../../server/db";
import credentialsProvider from "./providers/credentials";
import googleProvider from "./providers/google";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
const authOptions: NextAuthOptions = {
    providers: [credentialsProvider, googleProvider],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session({ session, token }) {
            if (token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        jwt({ token }) {
            return token;
        },
    },
    jwt: {
        secret: env.NEXTAUTH_SECRET,
    },
    session: {
        strategy: "jwt",
    },
    theme: {
        brandColor: "#FF0000",
        logo: "/logo-transparent-png-no-text.png",
    },
};

export default authOptions;
