import type { Post } from "../types/post";

type PrivatePostProps = {
    post: Post;
};

const PrivatePost = ({ post }: PrivatePostProps) => {
    return (
        <div className="opacity-60 hover:opacity-100">
            <div className="text-lg font-bold uppercase">{post.author}</div>
            <div>{post.content}</div>
        </div>
    );
};

export default PrivatePost;
