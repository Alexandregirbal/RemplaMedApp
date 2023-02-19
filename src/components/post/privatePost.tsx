import type { Post } from "./types";

type PrivatePostProps = {
    post: Post;
}

const PrivatePost = ({post}: PrivatePostProps) => {

    return (
        <div className="opacity-60 hover:opacity-100">
            <div className="uppercase font-bold text-lg">
                {post.author}
            </div>
            <div>
                {post.content}
            </div>
        </div>

    );
};

export default PrivatePost;