import axios from "axios";
import {
    getPaymentColor,
    getPaymentStatusString,
} from "modules/payments/utils";
import PostComponent from "modules/post/components/PostComponent";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { Post } from "server/database/models/post/types";
import { PaymentStatus } from "server/database/models/post/types";
import { setIsLoading } from "store/slices/ui/slice";

const MyPostsPage = () => {
    const session = useSession();
    const dispatch = useDispatch();
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = async () => {
        const response = await axios.get("/api/users/posts");
        if (response.status !== 200) return console.error(response);

        const data = (await response.data) as Post[];
        setPosts(data);
    };

    useEffect(() => {
        if (session.status !== "authenticated") return;
        void fetchPosts();
    }, [session]);

    const handleTogglePostPublishedState = async (post: Post) => {
        if (post.paymentStatus !== PaymentStatus.paid) {
            console.log("Post is not paid, cannot toggle published state.");
            return;
        }
        console.log(post);

        dispatch(setIsLoading(true));
        const response = await axios.put(`/api/posts/togglePublished`, {
            postId: post._id,
        });
        if (response.status !== 200) return console.error(response);

        await fetchPosts();
        dispatch(setIsLoading(false));
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
                    key={post._id.toString()}
                    className="flex w-full justify-between gap-4"
                >
                    <Link
                        id={post._id.toString()}
                        key={post._id.toString()}
                        href={`/posts/${post._id.toString()}`}
                        className="w-1/2"
                    >
                        <PostComponent post={post} isMini />
                    </Link>
                    <ul className="w-1/2 list-inside list-disc text-sm">
                        <li className="flex py-2">
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    disabled={
                                        post.paymentStatus !==
                                        PaymentStatus.paid
                                    }
                                    checked={post.published}
                                    onChange={() =>
                                        void handleTogglePostPublishedState(
                                            post
                                        )
                                    }
                                    className="peer sr-only"
                                />
                                <div className=" peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-background after:transition-all after:content-[''] peer-checked:bg-cta peer-checked:after:translate-x-full peer-checked:after:border-background peer-focus:outline-none  rtl:peer-checked:after:-translate-x-full "></div>
                                <span className="ms-3 text-sm font-medium ">
                                    {post.published ? "Publié" : "Non publié"}
                                </span>
                            </label>
                        </li>
                        <li className={getPaymentColor(post.paymentStatus)}>
                            {getPaymentStatusString(post.paymentStatus)}
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default MyPostsPage;
