/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from "axios";
import PostComponent from "modules/post/components/PostComponent";
import { useSession } from "next-auth/react";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectPostsState } from "store/slices/posts/slice";
import { setIsLoading } from "store/slices/ui/slice";

const Preview = () => {
    const { newPost } = useSelector(selectPostsState);
    const { data: session } = useSession();
    const dispatch = useDispatch();

    const author = session?.user;
    if (!author) {
        return null;
    }

    const handleNextClick = () => {
        const asyncFunction = async () => {
            dispatch(setIsLoading(true));
            const result = await axios.post("/api/posts/create", newPost);
            if (result.status !== 200) {
                alert("Une erreur est survenue (P1)");
            }
            const postId = result.data.postId as string;

            const paymentUrlResponse = await axios.get(
                `/api/payment?product=post&postId=${postId}`
            );
            const paymentUrl = paymentUrlResponse.data.paymentUrl as string;
            if (!paymentUrl) {
                alert("Une erreur est survenue (P2)");
            }

            dispatch(setIsLoading(false));
            void router.push(paymentUrl);
        };
        void asyncFunction();
    };

    const handlePreviousClick = () => {
        void router.back();
    };

    return (
        <div className="md:px-30 flex h-full grow flex-col justify-between p-6 sm:px-20 lg:px-40 xl:px-52 2xl:px-60">
            <h1 className="text-center text-xl">
                {`Prévisualisation de votre post`}
            </h1>
            <div className="h-4/6 w-full">
                <PostComponent
                    post={{
                        ...newPost,
                    }}
                />
            </div>
            <div>
                <span>{`Publication d'un post: 5.90€`}</span>
            </div>
            <div className="flex justify-evenly gap-8 text-base text-white">
                <button
                    onClick={handlePreviousClick}
                    className="w-full rounded-lg bg-tertiary px-5 py-2.5  hover:bg-tertiary focus:outline-none focus:ring-4 focus:ring-red-300 sm:w-auto"
                >
                    Retour
                </button>
                <button
                    onClick={handleNextClick}
                    className="w-full rounded-lg bg-cta px-5 py-2.5 text-center  hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
                >
                    Payer et publier
                </button>
            </div>
        </div>
    );
};

export default Preview;
