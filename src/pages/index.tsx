import { type NextPage } from "next";
import Link from "next/link";
import PrivatePost from "../modules/post/components/privatePost";
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
                    <PrivatePost key={1} post={mockPost} />
                </Link>
            </main>
        </Layout>
    );
};

export default Home;
