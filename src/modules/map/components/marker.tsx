import { type PostWithAuthorName } from "modules/post/types/post";
import { type MapboxEvent, Marker } from "react-map-gl";
import Pin from "./pin";
import { useDispatch } from "react-redux";
import { setSelectedPost } from "store/slices/posts/slice";
import { useRouter } from "next/router";

type MarkerComponentProps = {
    post: PostWithAuthorName;
};

const CustomMarkerComponent = ({ post }: MarkerComponentProps) => {
    const dispatch = useDispatch();
    const { push } = useRouter();

    const handleMarkerClick = async (event: MapboxEvent<MouseEvent>) => {
        event.originalEvent.stopPropagation(); // avoid `closeOnClick: true` on the Popup
        dispatch(setSelectedPost(post));
        await push(`/posts/${post.id}`);
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
                longitude={post.longitude}
                latitude={post.latitude}
                anchor="bottom"
                onClick={handleMarkerClick}
            >
                <Pin />
            </Marker>
        </div>
    );
};

export default CustomMarkerComponent;
