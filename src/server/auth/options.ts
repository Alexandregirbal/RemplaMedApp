import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import { env } from "../../env.mjs";
import { prisma } from "../db";
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
        session({ session, user }) {
            if (user) {
                session.user.id = user.id;
                session.user.email = user.email;
                session.user.name = user.name;
            }
            return session;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
    },
    jwt: {
        secret: env.NEXTAUTH_SECRET,
    },
    session: {
        strategy: "jwt",
    },
    secret: env.NEXTAUTH_SECRET,
    theme: {
        brandColor: "#FF0000",
        logo: "/logo-transparent-png-no-text.png",
    },
};

export default authOptions;
