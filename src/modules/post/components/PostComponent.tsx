import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { hidePrivateInformations } from "../services/hidePrivateInformations";
import { type PostWithAuthorName } from "../types/post";

require("dayjs/locale/fr");
dayjs.locale("fr");

type PostProps = {
    post: Partial<PostWithAuthorName>;
    isMini?: boolean;
    maxMessageLength?: number;
};

const PostComponent = ({
    post,
    isMini = false,
    maxMessageLength = 150,
}: PostProps) => {
    const { status, data } = useSession();

    const [isPrivate, setIsPrivate] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [postMessage, setPostMessage] = useState(post.message);
    const timeDiffMonths = post.availablityTo
        ? dayjs(post.availablityTo).diff(post.availablityFrom, "month")
        : 0;

    useEffect(() => {
        if (status != "authenticated") {
            setIsPrivate(true);
        } else {
            setIsPrivate(false);
        }
        if (data?.user?.id === post.authorId) {
            setIsAuthor(true);
        }
    }, [post.message, post.authorId, status, data]);

    useEffect(() => {
        if (!post.message) return;
        if (isPrivate) {
            setPostMessage(hidePrivateInformations(post.message));
        } else {
            setPostMessage(post.message);
        }

        // if (isMini && post.message.length > maxMessageLength) {
        //     setPostMessage(`${post.message.slice(0, maxMessageLength)} ...`);
        // }
    }, [post.message, isPrivate, isMini, maxMessageLength]);

    return (
        <div
            className={`flex max-h-full max-w-full flex-col rounded-lg border border-primary bg-background p-2 shadow-xl transition`}
        >
            <div className=" border-b border-b-primary p-1 text-center ">
                <div className="truncate text-xl font-bold">{post.title}</div>
                {post.city && post.postalCode && (
                    <div>{`${post.postalCode} ${post.city}`}</div>
                )}
            </div>
            <p>
                {post.availablityFrom && (
                    <span className="">
                        A partir du{" "}
                        <span className="font-bold">
                            {dayjs(post.availablityFrom).format("DD MMM YYYY")}
                        </span>
                    </span>
                )}
                {post.availablityTo && (
                    <span className="">
                        {" "}
                        {"jusqu'au"}{" "}
                        <span className="font-bold">
                            {dayjs(post.availablityTo).format("DD MMM YYYY")}
                        </span>
                        {timeDiffMonths ? ` (${timeDiffMonths} mois)` : ""}
                    </span>
                )}
            </p>
            <div className="h-full p-4 text-sm text-paragraph">
                <pre
                    className={
                        isMini
                            ? "line-clamp-5 overflow-hidden whitespace-normal"
                            : "overflow-y-auto overflow-x-hidden whitespace-pre-wrap"
                    }
                >
                    {postMessage}
                </pre>
            </div>
            {isPrivate && (
                <div className="text-sm text-red-700">
                    Les informations privées ont été masquées. Inscrivez-vous ou
                    connectez-vous pour y accéder.
                </div>
            )}
            {isAuthor && post.views !== undefined && (
                <div className="text-sm text-red-700">
                    {post.views} vue{post.views > 1 ? "s" : ""}
                </div>
            )}
            <div className="flex flex-row-reverse gap-1 text-sm">
                Posté le {dayjs(post.createdAt).format("D MMMM YYYY")}
            </div>
        </div>
    );
};

export default PostComponent;
