import Filters from "modules/filters";
import MapComponent from "modules/map";
import PostComponent from "modules/post/components/PostComponent";
import { findManyPosts } from "modules/post/dao/find";
import Loading from "modules/ui/loading";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { wrapper } from "store";
import { selectFiltersState } from "store/slices/filters/slice";
import { selectPostsState, setPosts } from "store/slices/posts/slice";
import { selectUIState } from "store/slices/ui/slice";

const Home: NextPage = () => {
    const { displayMode } = useSelector(selectFiltersState);
    const { data: posts, selectedPost } = useSelector(selectPostsState);
    const { isLoading } = useSelector(selectUIState);

    const [isMouseOverPostsList, setIsMouseOverPostsList] =
        useState<boolean>(false);

    const isMapDisplayed = displayMode === "map";
    const postIdPrefix = "home_";

    useEffect(() => {
        if (!selectedPost || !selectedPost.id) {
            return;
        }
        const ref = window.document.getElementById(
            `${postIdPrefix}${selectedPost.id}`
        );
        if (!ref || isMouseOverPostsList) {
            return;
        }
        ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [selectedPost, isMouseOverPostsList]);

    const handleMouseEnterOnPostsList = () => {
        setIsMouseOverPostsList(true);
    };
    const handleMouseLeaveOnPostsList = () => {
        setIsMouseOverPostsList(false);
    };

    return (
        <>
            <Filters />
            <div
                id="posts"
                className="flex-column flex h-[calc(100%-4rem)] w-full "
            >
                <div
                    onMouseEnter={handleMouseEnterOnPostsList}
                    onMouseLeave={handleMouseLeaveOnPostsList}
                    id="posts-list"
                    className={`${
                        isMapDisplayed ? "w-1/2" : "w-full"
                    } flex h-full flex-col gap-4 overflow-y-scroll p-2 pr-4`}
                >
                    {posts.map((post) => (
                        <Link
                            id={`${postIdPrefix}${post.id}`}
                            key={post.id}
                            href={`/posts/${post.id}`}
                        >
                            <PostComponent post={post} isMini />
                        </Link>
                    ))}
                </div>
                {isMapDisplayed && (
                    <div id="posts-map" className="w-full">
                        <MapComponent posts={posts} />
                    </div>
                )}
                {isLoading && <Loading />}
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
