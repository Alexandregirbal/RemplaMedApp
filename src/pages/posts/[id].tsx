import Head from "next/head";
import PrivatePost from "../../modules/post/components/PrivatePost";
import type { Post } from "@prisma/client";

type PostParams = {
    id: string;
};

export default function PostPage({ post }: { post: Post }) {
    return (
        <>
            <Head>
                <title>RemplaMed | {post.id}</title>
                <meta name="description" content={post.authorId} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="text-lg font-bold uppercase">{post.authorId}</div>
            <PrivatePost post={post} />
        </>
    );
}

export function getStaticPaths() {
    return {
        paths: [
            // can get paths from database
            { params: { id: "1A" } },
            { params: { id: "2B" } },
            { params: { id: "3C" } },
        ],
        fallback: false,
    };
}

export function getStaticProps({ params }: { params: PostParams }) {
    const post: Post = {
        id: params.id,
        authorId: "John Doe",
        message:
            "I am the content of the post.\n Here is my phone number: 0612345678. This is from the dynamic route.",
        createdAt: new Date(),
        updatedAt: null,
        published: false,
        title: "",
        availablityFrom: new Date("2023-09-01"),
        availablityTo: new Date("2023-12-31"),
        postalCode: "34000",
        views: 0,
    };
    return {
        props: {
            post: {
                ...post,
                createdAt: post.createdAt.toISOString(),
                updatedAt: post.updatedAt?.toISOString() ?? post.updatedAt,
            },
        },
    };
}
