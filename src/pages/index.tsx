import { type NextPage } from "next";
import Link from "next/link";
import Post from "../modules/post/components/Post";
import Layout from "../layout";

const mockPost = {
    id: "1A",
    author: "John Doe",
    content:
        "I am the content of the post.\n Here is my phone number: 0612345678",
};

const Home: NextPage = () => {
    return (
        <Layout>
            <main className="p-4">
                <Link href={`/posts/${mockPost.id}`}>
                    <Post key={1} post={mockPost} />
                </Link>
            </main>
        </Layout>
    );
};

export default Home;
