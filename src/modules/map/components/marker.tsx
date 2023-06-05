import { type PostWithAuthorName } from "modules/post/types/post";
import { type MapboxEvent, Marker, PointLike } from "react-map-gl";
import Pin from "./pin";
import { useDispatch, useSelector } from "react-redux";
import { selectPostsState, setSelectedPost } from "store/slices/posts/slice";
import { useRouter } from "next/router";
import { hashStringToNumber } from "modules/utils/hash";

type MarkerComponentProps = {
    post: PostWithAuthorName;
};

const CustomMarkerComponent = ({ post }: MarkerComponentProps) => {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const { selectedPost } = useSelector(selectPostsState);
    const isSelected = selectedPost && selectedPost.id === post.id;

    const hashedNumber = hashStringToNumber(post.id) % 13;
    const offset: PointLike = [hashedNumber, hashedNumber];

    const handleMarkerClick = (event: MapboxEvent<MouseEvent>) => {
        event.originalEvent.stopPropagation(); // avoid `closeOnClick: true` on the Popup
        dispatch(setSelectedPost(post));
        void push(`/posts/${post.id}`);
    };

    const handleMouseEnter = () => {
        dispatch(setSelectedPost(post));
    };

    const handleMouseLeave = () => {
        dispatch(setSelectedPost(null));
    };

    if (!post.latitude || !post.longitude) {
        return null;
    }
    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Marker
                offset={offset}
                longitude={post.longitude}
                latitude={post.latitude}
                anchor="bottom"
                onClick={handleMarkerClick}
            >
                <Pin isSelected={!!isSelected} />
            </Marker>
        </div>
    );
};

export default CustomMarkerComponent;
