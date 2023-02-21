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
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
                // session.user.role = user.role; <-- put other properties on the session here
            }
            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
    jwt: {
        secret: env.NEXTAUTH_SECRET,
    },
    providers: [credentialsProvider, googleProvider],
    theme: {
        brandColor: "#FF0000",
        logo: "/logo-transparent-png-no-text.png",
    },
    secret: env.NEXTAUTH_SECRET,
};

export default authOptions;
