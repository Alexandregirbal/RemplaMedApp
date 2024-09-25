import type { GetServerSidePropsContext } from "next";
import { getServerSession, type DefaultSession } from "next-auth";
import authOptions from "./options";

declare module "next-auth/jwt" {
    interface JWT {
        postsViewed: string[];
        phoneNumber?: string;
    }
}

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            _id: string;
            email: string;
            postsViewed: string[];
            phoneNumber?: string;
        } & DefaultSession["user"];
    }

    interface User {
        id?: string;
        postsViewed: string[];
        phoneNumber?: string;
    }
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
};
