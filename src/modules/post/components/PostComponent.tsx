import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostsState, setSelectedPost } from "store/slices/posts/slice";
import { hidePrivateInformations } from "../services/hidePrivateInformations";
import { type PostWithAuthorName } from "../types/post";

require("dayjs/locale/fr");
dayjs.locale("fr");

type PostProps = {
    post: PostWithAuthorName;
    isMini?: boolean;
    maxMessageLength?: number;
};

const PostComponent = ({
    post,
    isMini = false,
    maxMessageLength = 150,
}: PostProps) => {
    const { status } = useSession();
    const dispatch = useDispatch();

    const [isPrivate, setIsPrivate] = useState(false);
    const [postMessage, setPostMessage] = useState(post.message);
    const timeDiffMonths = post.availablityTo
        ? dayjs(post.availablityTo).diff(post.availablityFrom, "month")
        : 0;

    const { selectedPost } = useSelector(selectPostsState);
    const isSelected = selectedPost && selectedPost.id === post.id;

    useEffect(() => {
        if (status != "authenticated") {
            setIsPrivate(true);
        } else {
            setIsPrivate(false);
        }
    }, [post.message, status]);

    useEffect(() => {
        if (isPrivate) {
            setPostMessage(hidePrivateInformations(post.message));
        } else {
            setPostMessage(post.message);
        }

        if (isMini && post.message.length > maxMessageLength) {
            setPostMessage(`${post.message.slice(0, maxMessageLength)} ...`);
        }
    }, [post.message, isPrivate, isMini, maxMessageLength]);

    const handleMouseEnter = () => {
        if (!isMini) return;
        dispatch(setSelectedPost(post));
    };
    const handleMouseLeave = () => {
        if (!isMini) return;
        dispatch(setSelectedPost(null));
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`flex flex-col rounded-lg border ${
                isSelected ? " outline outline-2" : ""
            } ${
                isMini ? "" : "h-full"
            } border-primary bg-background p-2 shadow-xl transition`}
        >
            <div className=" border-b border-b-primary p-1 text-center ">
                <div className="truncate text-xl font-bold">{post.title}</div>
                <div className="">{post.postalCode}</div>
            </div>
            {post.availablityFrom && (
                <span className="">
                    A partir du{" "}
                    {dayjs(post.availablityFrom).format("DD MMM YYYY")}
                </span>
            )}
            {post.availablityTo && (
                <span className="">
                    {", "}
                    {"jusqu'au"}{" "}
                    {dayjs(post.availablityTo).format("DD MMM YYYY")}
                    {timeDiffMonths ? ` (${timeDiffMonths} mois)` : ""}
                </span>
            )}
            <pre className="h-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap p-4 text-paragraph">
                {postMessage}
            </pre>
            {isPrivate && (
                <div className="text-sm text-red-700">
                    This post is private, register to see the full content.
                </div>
            )}
            <div className="flex flex-row-reverse gap-1 text-sm">
                le {dayjs(post.createdAt).format("D MMMM YYYY")}
                <p className="italic">{post.author.name ?? "un inconnu"}</p>
                Posté par
            </div>
        </div>
    );
};

export default PostComponent;
