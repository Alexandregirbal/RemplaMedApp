/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
        jwt({ token, trigger, user, session }) {
            switch (trigger) {
                case "update":
                    if ("name" in session) token.name = session.name;
                    if ("newPostViewed" in session) {
                        token.postsViewed = Array.from(
                            new Set([
                                ...token.postsViewed,
                                session.newPostViewed,
                            ])
                        );
                    }
                    return token;

                case "signIn":
                case "signUp":
                    if (user && "postsViewed" in user) {
                        const postsViewed = new Set(user.postsViewed);
                        token.postsViewed = Array.from(postsViewed);
                    }
                    return token;

                default:
                    return token;
            }
        },
        session({ session, token }) {
            if (token?.sub) {
                session.user.id = token.sub;
            }
            if (token.postsViewed) {
                session.user.postsViewed = token.postsViewed;
            }
            return session;
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
