import axios from "axios";
import PostComponent from "modules/post/components/PostComponent";
import { findOnePost, findPostsIds } from "modules/post/dao/find";
import type { PostWithAuthorName } from "modules/post/types/post";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";

type PostPageParams = {
    id: string;
};

type PostPageProps = {
    post: PostWithAuthorName;
};

export default function PostPage({ post }: PostPageProps) {
    const headTitle = `RemplaMed | ${post.title}`;
    const session = useSession();
    useEffect(() => {
        void axios.put(`/api/posts/incrementViews`, { postId: post.id });
        if (session.status === "authenticated") {
            void axios.put(`/api/users/postViewed`, {
                postId: post.id,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);
    return (
        <>
            <Head>
                <title>{headTitle}</title>
                <meta name="description" content={post.authorId} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id={`post_${post.id}`} className="h-full py-10 px-60">
                <PostComponent post={post} />
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const postsIds = await findPostsIds();
    return {
        paths: postsIds.map((postId) => ({ params: postId })),
        fallback: "blocking",
    };
}

export async function getStaticProps({ params }: { params: PostPageParams }) {
    const post = await findOnePost(params.id);
    return {
        props: {
            post,
        },
        revalidate: 60,
    };
}
