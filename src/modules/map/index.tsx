import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { PostWithAuthorName } from "modules/post/types/post";
import { useRef } from "react";
import GeolocationFallback from "./components/fallback";
import { useMap } from "./hooks/useMap";
import { postsToGeoJSON } from "./utils/geojson";

type MapComponentProps = {
    posts: PostWithAuthorName[];
};

const MapComponent = ({ posts }: MapComponentProps) => {
    const geoJsonPosts = postsToGeoJSON(posts);

    mapboxgl.accessToken =
        "pk.eyJ1IjoiYWxleGFuZHJlZ2lyYmFsIiwiYSI6ImNsaHc2cHBmNjBndDkzZXF3dGM2ODh1c3YifQ.AhMdlbtUvHC2ucOOwRwsYw";
    const mapContainer = useRef<HTMLInputElement>(null);

    const { isGeolocationAvailable } = useMap({
        mapContainer,
        data: geoJsonPosts,
    });

    return (
        <>
            {!isGeolocationAvailable && <GeolocationFallback />}
            <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
        </>
    );
};

export default MapComponent;
