import type { Post } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import PostComponent from "../modules/post/components/PrivatePost";

const mockPosts: Post[] = [
    {
        id: "1A",
        authorId: "John Doe",
        content: `I am the content of the post.
Here is my phone number: 0612345678.
My email is jean@gmail.com or jean@gmail.com.
`,
        title: "My first post",
        createdAt: new Date(),
        updatedAt: null,
        published: true,
    },
    {
        id: "1B",
        authorId: "Jane Jack",
        content: `Just my email: jane.jack@gmail.com`,
        title: "My first post",
        createdAt: new Date(),
        updatedAt: null,
        published: true,
    },
    {
        id: "1C",
        authorId: "Numerous",
        content: `Just my phone: +33617181920`,
        title: "My first post",
        createdAt: new Date(),
        updatedAt: null,
        published: true,
    },
    {
        id: "1D",
        authorId: "Janette",
        content: `Nothing to hide here.`,
        title: "My first post",
        createdAt: new Date(),
        updatedAt: null,
        published: true,
    },
];

const Home: NextPage = () => {
    return (
        <main className="p-4">
            {mockPosts.map((post) => (
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
