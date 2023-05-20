import type { Post } from "@prisma/client";
import PrivatePost from "modules/post/components/PrivatePost";
import { findManyPosts, findOnePost } from "modules/post/dao/find";
import Head from "next/head";

type PostParams = {
    id: string;
};

export default function PostPage({ post }: { post: Post }) {
    const headTitle = `RemplaMed | ${post.title}`;
    return (
        <>
            <Head>
                <title>{headTitle}</title>
                <meta name="description" content={post.authorId} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="text-lg font-bold uppercase">{post.authorId}</div>
            <PrivatePost post={post} />
        </>
    );
}

export async function getStaticPaths() {
    const posts = await findManyPosts({ select: { id: true } });
    return {
        paths: posts.map((post) => ({ params: post })),
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: PostParams }) {
    const post = await findOnePost(params.id);
    return {
        props: {
            post,
        },
    };
}
