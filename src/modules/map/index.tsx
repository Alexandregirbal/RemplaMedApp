import "mapbox-gl/dist/mapbox-gl.css";
import type { PostWithAuthorName } from "modules/post/types/post";
import { useEffect, useRef, useState } from "react";
import { type ViewState, type ViewStateChangeEvent } from "react-map-gl";
import { useDispatch } from "react-redux";
import { setSelectedPost } from "store/slices/posts/slice";

import mapboxgl from "mapbox-gl";
import type { Feature, FeatureCollection } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";

type MapComponentProps = {
    posts: PostWithAuthorName[];
};

const postToGeoJson = (post: PostWithAuthorName): Feature | null => {
    if (!post.latitude || !post.longitude) return null;
    return {
        type: "Feature",
        properties: {
            ...post,
        },
        geometry: {
            type: "Point",
            coordinates: [post.longitude, post.latitude],
        },
    };
};

const postsToGeoJSON = (posts: PostWithAuthorName[]): FeatureCollection => {
    return {
        type: "FeatureCollection",
        features: posts.reduce<Feature[]>((acc, post) => {
            const geoJson = postToGeoJson(post);
            if (geoJson) {
                acc.push(geoJson);
            }
            return acc;
        }, []),
    };
};

const MapComponent = ({ posts }: MapComponentProps) => {
    const geoJsonPosts = postsToGeoJSON(posts);

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

    mapboxgl.accessToken =
        "pk.eyJ1IjoiYWxleGFuZHJlZ2lyYmFsIiwiYSI6ImNsaHc2cHBmNjBndDkzZXF3dGM2ODh1c3YifQ.AhMdlbtUvHC2ucOOwRwsYw";
    const mapContainer = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!mapContainer.current) return;
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-103.59179687498357, 40.66995747013945],
            zoom: 3,
        });

        map.on("load", () => {
            map.addSource("posts", {
                type: "geojson",
                data: geoJsonPosts,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50,
            });

            map.addLayer({
                id: "clusters",
                type: "circle",
                source: "posts",
                filter: ["has", "point_count"],
                paint: {
                    "circle-color": [
                        "step",
                        ["get", "point_count"],
                        "#51bbd6",
                        100,
                        "#f1f075",
                        750,
                        "#f28cb1",
                    ],
                    "circle-radius": [
                        "step",
                        ["get", "point_count"],
                        20,
                        100,
                        30,
                        750,
                        40,
                    ],
                },
            });

            map.addLayer({
                id: "cluster-count",
                type: "symbol",
                source: "posts",
                filter: ["has", "point_count"],
                layout: {
                    "text-field": "{point_count_abbreviated}",
                    "text-font": [
                        "DIN Offc Pro Medium",
                        "Arial Unicode MS Bold",
                    ],
                    "text-size": 12,
                },
            });

            map.addLayer({
                id: "unclustered-point",
                type: "circle",
                source: "posts",
                filter: ["!", ["has", "point_count"]],
                paint: {
                    "circle-color": "#11b4da",
                    "circle-radius": 8,
                    "circle-stroke-width": 1,
                    "circle-stroke-color": "#fff",
                },
            });
        });

        return () => map.remove();
    }, []);

    return (
        <>
            {!isGeolocationAvailable && (
                <div className="relative top-0 left-0 px-2 text-tertiary">
                    {
                        "La géolocalisation n'est pas disponible. Activez la, puis rafraîchissez la page pour une meilleure expérience."
                    }
                </div>
            )}
            <div
                ref={mapContainer}
                style={{ width: "100%", height: "100vh" }}
            />

            {/* <Map
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
            </Map> */}
        </>
    );
};

export default MapComponent;
