import axios from "axios";
import PostComponent from "modules/post/components/PostComponent";
import { findOnePost, findPostsIds } from "modules/post/dao/find";
import { getPostIntentLabel } from "modules/post/services/postIntentLabels";
import LeftArrow from "modules/ui/icons/leftArrow";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Post } from "server/database/models/post/types";
import { parseObjectToSerialize } from "server/database/parseMongoObject";
import { setIsLoading } from "store/slices/ui/slice";
import { addViewedPost, selectUserState } from "store/slices/user/slice";

type PostPageParams = {
    id: string;
};

type PostPageProps = {
    post: Post;
};

export default function PostPage({ post }: PostPageProps) {
    const session = useSession();
    const router = useRouter();
    const dispatch = useDispatch();
    const { postsViewed } = useSelector(selectUserState);

    useEffect(() => {
        dispatch(setIsLoading(false));

        void axios.put(`/api/posts/incrementViews`, { postId: post._id });

        if (session.status === "authenticated") {
            void axios.put(`/api/users/postViewed`, {
                postId: post._id.toString(),
            });
        }

        if (!postsViewed.includes(post._id.toString())) {
            dispatch(addViewedPost(post._id.toString()));
            void session.update({
                newPostViewed: post._id,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const metadata = {
        title: `RemplaMed: ${post.postalCode}`,
        description: `${getPostIntentLabel(post.intent)}: ${
            post.city ?? post.postalCode
        }`,
    };

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <div
                id={`post_${post._id.toString()}`}
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
        paths: postsIds.map((postId) => ({
            params: { id: postId._id.toString() },
        })),
        fallback: "blocking",
    };
}

export async function getStaticProps({ params }: { params: PostPageParams }) {
    const post = await findOnePost(params.id);

    if (!post) return { notFound: true, revalidate: 1 };

    return {
        props: {
            post: parseObjectToSerialize(post),
        },
        revalidate: false,
    };
}
