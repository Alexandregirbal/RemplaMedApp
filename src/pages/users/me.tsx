import PostComponent from "modules/post/components/PostComponent";
import type { PostWithDatesStrings } from "modules/post/types/post";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserMePage = () => {
    const session = useSession();

    const [posts, setPosts] = useState<PostWithDatesStrings[]>([]);

    useEffect(() => {
        if (session.status !== "authenticated") return;

        const fetchPosts = async () => {
            const response = await fetch("/api/users/posts");
            const data = (await response.json()) as PostWithDatesStrings[];

            setPosts(data);
        };

        void fetchPosts();
    }, [session]);

    if (session.status !== "authenticated") return null;

    const { user } = session.data;
    if (!user) return null;

    return (
        <div
            className={`flex h-full w-full flex-col gap-4 overflow-y-scroll p-2 px-4 pt-10 sm:px-20 md:px-40 lg:px-60 xl:px-80 2xl:px-96 `}
        >
            <h1>Mon profile</h1>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Nom: {user.name}</p>
            <hr />
            <h2>Mes posts</h2>
            {posts.map((post) => (
                <Link id={post.id} key={post.id} href={`/posts/${post.id}`}>
                    <PostComponent post={post} isMini />
                </Link>
            ))}
        </div>
    );
};

export default UserMePage;
