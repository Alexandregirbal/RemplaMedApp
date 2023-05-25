import type { Post } from "@prisma/client";
import Filters from "modules/filters";
import MapComponent from "modules/map";
import PostComponent from "modules/post/components/PrivatePost";
import { findManyPosts } from "modules/post/dao/find";
import type { NextPage } from "next";
import Link from "next/link";
import { wrapper } from "store";
import { setPosts } from "store/slices/posts/slice";

type HomeProps = {
    posts: Post[];
};

const Home: NextPage<HomeProps> = ({ posts }) => {
    return (
        <>
            <Filters />
            <div id="posts" className="flex-column flex h-[calc(100%-5rem)] ">
                <div
                    id="posts-list"
                    className=" h-full w-1/3 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-lg"
                >
                    {posts.map((post) => (
                        <Link
                            className="opacity-60 hover:opacity-100"
                            key={post.id}
                            href={`/posts/${post.id}`}
                        >
                            <PostComponent post={post} />
                        </Link>
                    ))}
                </div>
                <div id="posts-map" className="w-8/12">
                    <MapComponent />
                </div>
            </div>
        </>
    );
};

export default Home;

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    const posts = await findManyPosts({ orderBy: { createdAt: "desc" } });
    store.dispatch(setPosts(posts));
    return {
        props: {
            posts: posts,
        },
    };
});
