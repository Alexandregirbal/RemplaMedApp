import "mapbox-gl/dist/mapbox-gl.css";
import type { PostWithAuthorName } from "modules/post/types/post";
import { useEffect, useState } from "react";
import Map, {
    GeolocateControl,
    NavigationControl,
    type ViewState,
    type ViewStateChangeEvent,
} from "react-map-gl";
import CustomMarkerComponent from "./components/marker";
import { useDispatch } from "react-redux";
import { setSelectedPost } from "store/slices/posts/slice";

type MapComponentProps = {
    posts: PostWithAuthorName[];
};

const MapComponent = ({ posts }: MapComponentProps) => {
    const dispatch = useDispatch();

    const [isGeolocationAvailable, setIsGeolocationAvailable] =
        useState<boolean>(true);
    const [viewport, setViewport] = useState<ViewState>({
        latitude: 46.77177190772532, // Bruère-Allichamps
        longitude: 2.4338675388986273, // Bruère-Allichamps
        zoom: 5,
        bearing: 0,
        pitch: 0,
        padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setIsGeolocationAvailable(true);
                setViewport({
                    ...viewport,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    zoom: 10,
                });
            },
            (error) => {
                if (error.code === 1) {
                    setIsGeolocationAvailable(false);
                }
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMapMove = (e: ViewStateChangeEvent): void => {
        setViewport(e.viewState);
    };

    const handleMapClick = () => {
        dispatch(setSelectedPost(null));
    };

    return (
        <>
            {!isGeolocationAvailable && (
                <div className="relative top-0 left-0 px-2 text-tertiary">
                    {
                        "La géolocalisation n'est pas disponible. Activez la, puis rafraîchissez la page pour une meilleure expérience."
                    }
                </div>
            )}
            <Map
                mapboxAccessToken="pk.eyJ1IjoiYWxleGFuZHJlZ2lyYmFsIiwiYSI6ImNsaHc2cHBmNjBndDkzZXF3dGM2ODh1c3YifQ.AhMdlbtUvHC2ucOOwRwsYw"
                initialViewState={viewport}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                latitude={viewport.latitude}
                longitude={viewport.longitude}
                zoom={viewport.zoom}
                onMove={handleMapMove}
                onClick={handleMapClick}
            >
                <GeolocateControl
                    position="top-left"
                    trackUserLocation
                    showUserLocation
                />
                <NavigationControl position="top-left" />
                {posts.map((post) => (
                    <CustomMarkerComponent
                        key={`marker-${post.id}`}
                        post={post}
                    />
                ))}
            </Map>
        </>
    );
};

export default MapComponent;
