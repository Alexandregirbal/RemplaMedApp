import Filters from "modules/filters";
import MapComponent from "modules/map";
import PostComponent from "modules/post/components/PostComponent";
import { findManyPosts } from "modules/post/dao/find";
import type { PostWithAuthorName } from "modules/post/types/post";
import type { NextPage } from "next";
import Link from "next/link";
import { useSelector } from "react-redux";
import { wrapper } from "store";
import { selectFiltersState } from "store/slices/filters/slice";
import { selectPostsState, setPosts } from "store/slices/posts/slice";

type HomeProps = {
    posts: PostWithAuthorName[];
};

const Home: NextPage<HomeProps> = ({ posts }) => {
    const { displayMode } = useSelector(selectFiltersState);
    const { selectedPost } = useSelector(selectPostsState);

    const isMapDisplayed = displayMode === "map";

    return (
        <>
            <Filters />
            <div
                id="posts"
                className="flex-column flex h-[calc(100%-5rem)] w-full "
            >
                <div
                    id="posts-list"
                    className={`${
                        isMapDisplayed ? "w-1/2" : "w-full"
                    } h-full overflow-y-scroll p-2 pr-4 scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-lg`}
                >
                    {posts.map((post) => (
                        <Link key={post.id} href={`/posts/${post.id}`}>
                            <PostComponent post={post} isMini />
                        </Link>
                    ))}
                </div>
                {isMapDisplayed && (
                    <div id="posts-map" className="w-full">
                        <MapComponent posts={posts} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    const posts = await findManyPosts({
        orderBy: { createdAt: "desc" },
    });

    store.dispatch(setPosts(posts));
    return {
        props: {
            posts: posts,
        },
    };
});
