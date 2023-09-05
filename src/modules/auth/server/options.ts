import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import { prisma } from "server/db";
import { env } from "../../../env.mjs";
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
        jwt({ token, trigger, session }) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (trigger === "update" && session?.name) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                token.name = session.name;
            }
            return token;
        },
        signIn({ user }) {
            if (user) {
                return true;
            }
            return false;
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
        logo: "/remplamed_logo.svg",
    },
    pages: {
        signIn: "/auth/signin",
    },
};

export default authOptions;
