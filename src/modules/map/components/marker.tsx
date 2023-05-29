import { type PostWithAuthorName } from "modules/post/types/post";
import { type MapboxEvent, Marker } from "react-map-gl";
import Pin from "./pin";
import { useDispatch } from "react-redux";
import { setSelectedPost } from "store/slices/posts/slice";

type MarkerComponentProps = {
    post: PostWithAuthorName;
};

const CustomMarkerComponent = ({ post }: MarkerComponentProps) => {
    const dispatch = useDispatch();

    const handleMarkerClick = (event: MapboxEvent<MouseEvent>) => {
        event.originalEvent.stopPropagation(); // avoid `closeOnClick: true` on the Popup
        dispatch(setSelectedPost(post));
    };

    if (!post.latitude || !post.longitude) {
        return null;
    }
    return (
        <Marker
            longitude={post.longitude}
            latitude={post.latitude}
            anchor="bottom"
            onClick={handleMarkerClick}
        >
            <Pin />
        </Marker>
    );
};

export default CustomMarkerComponent;
