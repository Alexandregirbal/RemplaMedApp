import { type NextPage } from "next";
import Link from "next/link";
import Post from "../modules/post/components/Post";
import Layout from "../layout";

const mockPosts = [
    {
        id: "1A",
        author: "John Doe",
        content: `I am the content of the post.
Here is my phone number: 0612345678.
My email is jean@gmail.com or jean@gmail.com.
`,
    },
    {
        id: "1B",
        author: "Jane Jack",
        content: `Just my email: jane.jack@gmail.com`,
    },
    {
        id: "1C",
        author: "Numerous",
        content: `Just my phone: +33617181920`,
    },
    {
        id: "1D",
        author: "Janette",
        content: `Nothing to hide here.`,
    },
];

const Home: NextPage = () => {
    return (
        <Layout>
            <main className="p-4">
                {mockPosts.map((post) => (
                    <Link key={post.id} href={`/posts/${post.id}`}>
                        <Post post={post} />
                    </Link>
                ))}
            </main>
        </Layout>
    );
};

export default Home;
