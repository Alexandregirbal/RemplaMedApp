import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectFiltersState } from "store/slices/filters/slice";
import { isAnyFilterSet } from "store/slices/filters/utils";
import { selectPostsState } from "store/slices/posts/slice";
import GeolocationFallback from "./components/fallback";
import { useMap } from "./hooks/useMap";
import { postsToGeoJSON } from "./utils/geojson";

const MapComponent = () => {
    const { data: posts, filteredPosts } = useSelector(selectPostsState);
    const filters = useSelector(selectFiltersState);
    const [postsToDisplay, setPostsToDisplay] = useState(postsToGeoJSON(posts));

    mapboxgl.accessToken =
        "pk.eyJ1IjoiYWxleGFuZHJlZ2lyYmFsIiwiYSI6ImNsaHc2cHBmNjBndDkzZXF3dGM2ODh1c3YifQ.AhMdlbtUvHC2ucOOwRwsYw";
    const mapContainer = useRef<HTMLInputElement>(null);

    const { isGeolocationAvailable } = useMap({
        mapContainer,
        data: postsToDisplay,
    });

    useEffect(() => {
        if (isAnyFilterSet(filters)) {
            setPostsToDisplay(postsToGeoJSON(filteredPosts));
        } else {
            setPostsToDisplay(postsToGeoJSON(posts));
        }
    }, [posts, filteredPosts, filters]);

    return (
        <>
            {!isGeolocationAvailable && <GeolocationFallback />}
            <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
        </>
    );
};

export default MapComponent;
