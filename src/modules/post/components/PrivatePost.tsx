import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { hidePrivateInformations } from "../services/hidePrivateInformations";
import { type PostWithAuthorName } from "../types/post";

type PostProps = {
    post: PostWithAuthorName;
};

const PrivatePost = ({ post }: PostProps) => {
    const { status } = useSession();

    const [isPrivate, setIsPrivate] = useState(false);
    const [privatePostContent, setPrivatePostContent] = useState(post.message);

    useEffect(() => {
        if (status != "authenticated") {
            setPrivatePostContent(hidePrivateInformations(post.message));
            setIsPrivate(true);
        } else {
            setIsPrivate(false);
        }
    }, [status, post.message]);

    return (
        <div className="my-4">
            <div className="text-lg font-bold uppercase">{post.title}</div>
            <p>{post.author.name}</p>
            <pre className="whitespace-pre-wrap">
                {isPrivate ? privatePostContent : post.message}
            </pre>
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

export default PrivatePost;
