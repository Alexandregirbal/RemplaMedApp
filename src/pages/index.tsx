import type { Post } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import PostComponent from "../modules/post/components/PrivatePost";
import { findManyPosts } from "../modules/post/dao/find";
import Filters from "../modules/filters";

type HomeProps = {
    posts: Post[];
};

const Home: NextPage<HomeProps> = ({ posts }) => {
    return (
        <main className="p-4">
            <Filters />
            {posts.map((post) => (
                <Link
                    className="opacity-60 hover:opacity-100"
                    key={post.id}
                    href={`/posts/${post.id}`}
                >
                    <PostComponent post={post} />
                </Link>
            ))}
        </main>
    );
};

export default Home;

export async function getStaticProps() {
    const posts = await findManyPosts({ orderBy: { createdAt: "desc" } });
    return {
        props: {
            posts: posts,
        },
    };
}
