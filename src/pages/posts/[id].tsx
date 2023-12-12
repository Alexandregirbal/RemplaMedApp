import axios from "axios";
import PostComponent from "modules/post/components/PostComponent";
import { findOnePost, findPostsIds } from "modules/post/dao/find";
import type { PostWithAuthorName } from "modules/post/types/post";
import LeftArrow from "modules/ui/icons/leftArrow";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

type PostPageParams = {
    id: string;
};

type PostPageProps = {
    post: PostWithAuthorName;
};

export default function PostPage({ post }: PostPageProps) {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        void axios.put(`/api/posts/incrementViews`, { postId: post.id });
        if (session.status === "authenticated") {
            void axios.put(`/api/users/postViewed`, {
                postId: post.id,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    const headTitle = `RemplaMed | ${post.title}`;
    return (
        <>
            <Head>
                <title>{headTitle}</title>
                <meta name="description" content={post.authorId} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div
                id={`post_${post.id}`}
                className="flex h-full flex-col gap-4 px-4 py-10 sm:px-16 md:px-32 lg:px-60"
            >
                <button
                    className="flex items-center gap-2 text-xl text-cta"
                    onClick={() => void router.back()}
                >
                    <LeftArrow />
                    Retour
                </button>
                <div className="min-h-0 grow">
                    <PostComponent post={post} />
                </div>
            </div>
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

export async function getStaticProps({ params }: { params: PostPageParams }) {
    const post = await findOnePost(params.id);
    if (!post) return { notFound: true, revalidate: false };

    return {
        props: {
            post,
        },
        revalidate: 60,
    };
}
