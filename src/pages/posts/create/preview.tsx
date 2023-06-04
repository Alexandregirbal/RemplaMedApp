import PostComponent from "modules/post/components/PostComponent";
import { useSelector } from "react-redux";
import { selectPostsState } from "store/slices/posts/slice";

const Preview = () => {
    const { newPost } = useSelector(selectPostsState);

    return (
        <div>
            <PostComponent post={newPost} />
        </div>
    );
};

export default Preview;
