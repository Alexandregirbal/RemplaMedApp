import { PostIntent } from "@prisma/client";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { hidePrivateInformations } from "../services/hidePrivateInformations";
import { getPostIntentLabel } from "../services/postIntentLabels";
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
    const timeDiffWeeks = post.availablityTo
        ? dayjs(post.availablityTo).diff(post.availablityFrom, "week")
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
            className={`flex max-h-full w-full flex-col gap-2 rounded-lg border border-primary bg-background py-2 shadow-xl transition`}
        >
            <div className=" border-b border-b-primary px-2 pb-2 text-center text-xl font-bold ">
                <div className={isMini ? "truncate" : ""}>
                    {getPostIntentLabel(
                        post.intent ?? PostIntent.replacementOffer
                    )}{" "}
                    {post.postalCode}
                </div>
                {post.city && <div>{post.city}</div>}
            </div>
            <div className="px-2 text-sm">
                {post.availablityFrom && (
                    <p>
                        A partir du{" "}
                        <span className="font-bold">
                            {dayjs(post.availablityFrom).format("DD MMM YYYY")}
                        </span>
                    </p>
                )}
                {post.availablityTo && (
                    <p>
                        {"Jusqu'au"}{" "}
                        <span className="font-bold">
                            {dayjs(post.availablityTo).format("DD MMM YYYY")}
                        </span>
                        {timeDiffWeeks
                            ? ` (${timeDiffWeeks} semaine${
                                  timeDiffWeeks > 1 ? "s" : ""
                              })`
                            : ""}
                    </p>
                )}
            </div>
            <div className="h-full w-full overflow-y-auto px-4  text-paragraph">
                <pre
                    className={
                        isMini
                            ? "line-clamp-4 overflow-hidden whitespace-normal text-sm"
                            : "h-full whitespace-pre-wrap"
                    }
                >
                    {postMessage}
                </pre>
            </div>
            {isPrivate && (
                <div className="px-2 text-sm text-tertiary">
                    Les informations privées ont été masquées. Inscrivez-vous ou
                    connectez-vous pour y accéder.
                </div>
            )}
            <div
                className={`flex flex-row-reverse justify-between gap-1 px-2 ${
                    isMini ? "text-xs" : "text-sm"
                }`}
            >
                <span>Créé le {dayjs(post.createdAt).format("D MMMM")}</span>
                {isAuthor && post.views !== undefined && (
                    <span className="text-tertiary">
                        {post.views} vue{post.views > 1 ? "s" : ""}
                    </span>
                )}
            </div>
        </div>
    );
};

export default PostComponent;
