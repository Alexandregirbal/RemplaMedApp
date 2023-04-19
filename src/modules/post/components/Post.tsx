import { useSession } from "next-auth/react";
import type { Post } from "../types/post";
import { hidePrivateInformations } from "../services/hidePrivateInformations";

type PostProps = {
    post: Post;
};

const PrivatePost = ({ post }: PostProps) => {
    const { status } = useSession();
    console.log(`LOG by Girbal --- | PrivatePost | status---`, status);
    if (status != "authenticated")
        post.content = hidePrivateInformations(post.content);

    return (
        <div className="opacity-60 hover:opacity-100">
            <div className="text-lg font-bold uppercase">{post.author}</div>
            <div>{post.content}</div>
        </div>
    );
};

export default PrivatePost;
