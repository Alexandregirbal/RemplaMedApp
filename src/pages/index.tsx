import Filters from "modules/filters";
import MapComponent from "modules/map";
import PostComponent from "modules/post/components/PostComponent";
import { findManyPosts } from "modules/post/dao/find";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "store";
import { selectPostsState, setPosts } from "store/slices/posts/slice";
import {
    setPostsViewed,
    setUserEmail,
    setUserId,
} from "store/slices/user/slice";

const postIdPrefix = "home_";

const Home: NextPage = () => {
    const { selectedPosts } = useSelector(selectPostsState);

    const { data: session } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if (session?.user) {
            dispatch(setPostsViewed(session.user.postsViewed ?? []));
            dispatch(setUserId(session.user.id));
            dispatch(setUserEmail(session.user.email));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    return (
        <>
            <Head>
                <title>RemplaMed</title>
                <meta
                    name="description"
                    content="Remplacement infirmiers facile autour de chez vous."
                    key="description"
                />
            </Head>
            <Filters />
            <div
                id="posts"
                className="flex-column relative flex h-[calc(100%-4rem)] w-full "
            >
                <div id="posts-map" className="w-full">
                    <MapComponent />
                </div>
                {selectedPosts.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-row gap-4 overflow-y-hidden overflow-x-scroll bg-opac p-4">
                        {selectedPosts.map((post) => (
                            <Link
                                id={`${postIdPrefix}${post.id}`}
                                key={post.id}
                                href={`/posts/${post.id}`}
                                className="flex w-80 items-center justify-center"
                            >
                                <PostComponent post={post} isMini />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    const posts = await findManyPosts({});
    store.dispatch(setPosts(posts));
    return {
        props: {},
        revalidate: 30,
    };
});
