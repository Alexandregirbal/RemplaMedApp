import { PaymentStatus } from "@mollie/api-client";
import axios from "axios";
import PostComponent from "modules/post/components/PostComponent";
import type { PostWithDatesStrings } from "modules/post/types/post";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { setIsLoading } from "store/slices/ui/slice";

const MyPostsPage = () => {
    const session = useSession();
    const [posts, setPosts] = useState<PostWithDatesStrings[]>([]);

    const fetchPosts = async () => {
        const response = await axios.get("/api/users/posts");
        if (response.status !== 200) return console.error(response);

        const data = (await response.data) as PostWithDatesStrings[];
        setPosts(data);
    };

    useEffect(() => {
        if (session.status !== "authenticated") return;
        void fetchPosts();
    }, [session]);

    const handleTogglePostPublishedState = async (
        post: PostWithDatesStrings
    ) => {
        if (post.paymentStatus !== PaymentStatus.paid) {
            console.log("Post is not paid, cannot toggle published state.");
            return;
        }
        console.log(post);

        setIsLoading(true);
        const response = await axios.put(`/api/posts/togglePublished`, {
            postId: post.id,
        });
        if (response.status !== 200) return console.error(response);

        await fetchPosts();
        setIsLoading(false);
    };

    if (session.status !== "authenticated") return null;

    const { user } = session.data;
    if (!user) return null;

    return (
        <div
            className={`flex h-full w-full flex-col gap-4 overflow-y-scroll p-2 px-4 sm:px-20 md:px-40 lg:px-60 xl:px-80 2xl:px-96 `}
        >
            <h1 className="text-2xl">Mes annonces</h1>
            {posts.slice(0, 10).map((post) => (
                <div
                    key={post.id}
                    className="flex w-full justify-between gap-4"
                >
                    <Link
                        id={post.id}
                        key={post.id}
                        href={`/posts/${post.id}`}
                        className="w-1/2"
                    >
                        <PostComponent post={post} isMini />
                    </Link>
                    <ul className="w-1/2 list-inside list-disc text-sm">
                        <li className="flex py-2">
                            <label className="relative inline-flex cursor-pointer items-center">
                                {post.paymentStatus === PaymentStatus.paid && (
                                    <>
                                        <input
                                            type="checkbox"
                                            value={post.published ? "1" : "0"}
                                            className="peer sr-only"
                                            onClick={() =>
                                                void handleTogglePostPublishedState(
                                                    post
                                                )
                                            }
                                        />
                                        <div className=" peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-background after:transition-all after:content-[''] peer-checked:bg-cta peer-checked:after:translate-x-full peer-checked:after:border-background peer-focus:outline-none  rtl:peer-checked:after:-translate-x-full "></div>
                                    </>
                                )}
                                <span className="ms-3 text-sm font-medium ">
                                    {post.published ? "Publié" : "Non publié"}
                                </span>
                            </label>
                        </li>

                        <li>
                            {post.paymentStatus === PaymentStatus.paid
                                ? "Payé"
                                : `Paiement: ${post.paymentStatus ?? "aucun"}`}
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default MyPostsPage;
