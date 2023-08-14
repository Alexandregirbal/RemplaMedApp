import Filters from "modules/filters";
import MapComponent from "modules/map";
import PostComponent from "modules/post/components/PostComponent";
import { findManyPosts } from "modules/post/dao/find";
import type { NextPage } from "next";
import Link from "next/link";
import { useSelector } from "react-redux";
import { wrapper } from "store";
import { selectPostsState, setPosts } from "store/slices/posts/slice";

const postIdPrefix = "home_";

const Home: NextPage = () => {
    const { selectedPosts } = useSelector(selectPostsState);

    return (
        <>
            <Filters />
            <div
                id="posts"
                className="flex-column relative flex h-[calc(100%-4rem)] w-full "
            >
                <div id="posts-map" className="w-full">
                    <MapComponent />
                </div>
                {selectedPosts.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 z-20 flex h-1/2 flex-row gap-4 overflow-x-scroll bg-opac p-4">
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
