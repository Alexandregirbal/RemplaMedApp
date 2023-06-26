import Filters from "modules/filters";
import MapComponent from "modules/map";
import PostComponent from "modules/post/components/PostComponent";
import { findManyPosts } from "modules/post/dao/find";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "store";
import { selectFiltersState } from "store/slices/filters/slice";
import { selectPostsState, setPosts } from "store/slices/posts/slice";
import { selectUIState, setIsMobile } from "store/slices/ui/slice";

const Home: NextPage = () => {
    const { displayMode } = useSelector(selectFiltersState);
    const { data: posts, selectedPost } = useSelector(selectPostsState);
    const { isMobile } = useSelector(selectUIState);

    const dispatch = useDispatch();

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
    useEffect(() => {
        const { matches } = window.matchMedia("(max-width: 450px)");
        if (matches) {
            dispatch(setIsMobile(true));
        }
    }, [dispatch]);

    return (
        <>
            <Filters />
            <div
                id="posts"
                className="flex-column relative flex h-[calc(100%-4rem)] w-full "
            >
                {!isMobile && (
                    <div
                        onMouseEnter={handleMouseEnterOnPostsList}
                        onMouseLeave={handleMouseLeaveOnPostsList}
                        id="posts-list"
                        className={`p-2 ${
                            isMapDisplayed
                                ? "w-1/2 pr-4"
                                : `w-full ${
                                      isMobile ? "px-4 pt-4" : "px-40 pt-10"
                                  } `
                        } flex h-full flex-col gap-4 overflow-y-scroll`}
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
                )}
                {isMapDisplayed && (
                    <div id="posts-map" className="w-full">
                        <MapComponent posts={posts} />
                    </div>
                )}
                {isMapDisplayed && selectedPost && isMobile && (
                    <div className="absolute bottom-4 left-4 right-4 z-20 ">
                        <Link
                            id={`${postIdPrefix}${selectedPost.id ?? "post"}`}
                            key={selectedPost.id}
                            href={`/posts/${selectedPost.id ?? ""}`}
                        >
                            <PostComponent post={selectedPost} isMini />
                        </Link>
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
