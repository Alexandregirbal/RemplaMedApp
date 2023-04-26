import Head from "next/head";
import type { Post } from "../../modules/post/types/post";
import PrivatePost from "../../modules/post/components/PrivatePost";

type PostParams = {
    id: string;
};

export default function PostPage({ post }: { post: Post }) {
    return (
        <>
            <Head>
                <title>RemplaMed | {post.id}</title>
                <meta name="description" content={post.author} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="text-lg font-bold uppercase">{post.author}</div>
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
        author: "John Doe",
        content:
            "I am the content of the post.\n Here is my phone number: 0612345678. This is from the dynamic route.",
    };
    return {
        props: {
            post,
        },
    };
}
