import PostComponent from "modules/post/components/PostComponent";
import { findOnePost, findPostsIds } from "modules/post/dao/find";
import type { PostWithAuthorName } from "modules/post/types/post";
import Head from "next/head";

type PostParams = {
    id: string;
};

export default function PostPage({ post }: { post: PostWithAuthorName }) {
    const headTitle = `RemplaMed | ${post.title}`;
    return (
        <>
            <Head>
                <title>{headTitle}</title>
                <meta name="description" content={post.authorId} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="text-lg font-bold uppercase">{post.authorId}</div>
            <PostComponent post={post} />
        </>
    );
}

export async function getStaticPaths() {
    const postsIds = await findPostsIds();
    return {
        paths: postsIds.map((postId) => ({ params: postId })),
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
