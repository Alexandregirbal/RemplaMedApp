import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { hidePrivateInformations } from "../services/hidePrivateInformations";
import { type PostWithAuthorName } from "../types/post";

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

    const [isPrivate, setIsPrivate] = useState(false);
    const [postMessage, setPostMessage] = useState(post.message);

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

    return (
        <div className="my-4">
            <div className="text-lg font-bold uppercase">{post.title}</div>
            <p>{post.author.name}</p>
            <pre className="whitespace-pre-wrap">{postMessage}</pre>
            {isPrivate && (
                <div className="text-sm text-red-700">
                    This post is private, register to see the full content.
                </div>
            )}
            {post.availablityFrom && (
                <p>
                    A partir du{" "}
                    {dayjs(post.availablityFrom).format("DD MMM YYYY")}
                </p>
            )}
        </div>
    );
};

export default PostComponent;
