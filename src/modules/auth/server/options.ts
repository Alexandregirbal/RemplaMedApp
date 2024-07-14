/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { type NextAuthOptions } from "next-auth";
import mongooseConnect from "server/database/mongoose";
import { env } from "../../../env.mjs";
import credentialsProvider from "./providers/credentials";
import googleProvider from "./providers/google";

const authOptions: NextAuthOptions = {
    providers: [credentialsProvider, googleProvider],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    adapter: MongoDBAdapter(mongooseConnect().then((res) => res.mongoClient)),
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
                        console.log(`~~~~~ Girbalog | jwt | user: `, user);

                        const postsViewed = new Set(user.postsViewed);
                        token.postsViewed = Array.from(postsViewed);
                        token.sub = user._id.toString();
                    }
                    return token;

                default:
                    return token;
            }
        },
        session({ session, token }) {
            if (token.sub) {
                session.user._id = token.sub;
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
