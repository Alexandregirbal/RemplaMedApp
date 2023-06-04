import PostComponent from "modules/post/components/PostComponent";
import { useSession } from "next-auth/react";
import router from "next/router";
import { useSelector } from "react-redux";
import { selectPostsState } from "store/slices/posts/slice";

const Preview = () => {
    const { newPost } = useSelector(selectPostsState);
    const { data: session } = useSession();

    const author = session?.user;
    if (!author) {
        return null;
    }

    const handleNextClick = () => {
        void router.push("/posts/create/payment");
    };

    const handlePreviousClick = () => {
        void router.push("/posts/create");
    };

    return (
        <div className="flex h-full flex-col gap-8 px-60 pt-8">
            <div className=" h-5/6">
                <PostComponent
                    post={{
                        ...newPost,
                        id: "not_defined_yet",
                        author: { name: author.name ?? "vous" },
                    }}
                />
            </div>
            <div className="flex justify-evenly">
                <button
                    onClick={handlePreviousClick}
                    className="w-full rounded-lg bg-red-900 px-5 py-2.5 text-center text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 sm:w-auto"
                >
                    Retour
                </button>
                <button
                    onClick={handleNextClick}
                    className="w-full rounded-lg bg-cta px-5 py-2.5 text-center text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default Preview;
