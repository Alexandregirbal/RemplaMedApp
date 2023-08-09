/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import mapboxgl, { type FlyToOptions, type GeoJSONSource } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { PostWithAuthorName } from "modules/post/types/post";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedPosts } from "store/slices/posts/slice";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.cjs";
import GeolocationFallback from "./components/fallback";
import { postsToGeoJSON } from "./utils/geojson";
import { getNewZoomedValue } from "./utils/zoom";

const fullConfig = resolveConfig(tailwindConfig);

type MapComponentProps = {
    posts: PostWithAuthorName[];
    isMobile: boolean;
};

const MapComponent = ({ posts, isMobile }: MapComponentProps) => {
    const geoJsonPosts = postsToGeoJSON(posts);

    const dispatch = useDispatch();
    const router = useRouter();

    const [isGeolocationAvailable, setIsGeolocationAvailable] =
        useState<boolean>(true);

    mapboxgl.accessToken =
        "pk.eyJ1IjoiYWxleGFuZHJlZ2lyYmFsIiwiYSI6ImNsaHc2cHBmNjBndDkzZXF3dGM2ODh1c3YifQ.AhMdlbtUvHC2ucOOwRwsYw";
    const mapContainer = useRef<HTMLInputElement>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            () => {
                setIsGeolocationAvailable(true);
            },
            (error) => {
                if (error.code === 1) {
                    setIsGeolocationAvailable(false);
                }
            }
        );

        if (!mapContainer.current) return;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [2.4338675388986273, 46.77177190772532], // Bruère-Allichamps
            zoom: 5,
            bearing: 0,
            pitch: 0,
        });
        const handleMapLoad = (map: mapboxgl.Map) => {
            map.addSource("posts", {
                type: "geojson",
                data: geoJsonPosts,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50,
            });

            map.addLayer({
                id: "posts-clusters",
                type: "circle",
                source: "posts",
                filter: ["has", "point_count"],
                paint: {
                    "circle-color": [
                        "step",
                        ["get", "point_count"],
                        "#00BBBF",
                        50,
                        "#007C9F",
                        100,
                        fullConfig.theme?.colors?.primary,
                    ],
                    "circle-radius": [
                        "step",
                        ["get", "point_count"],
                        20,
                        50,
                        30,
                        100,
                        40,
                    ],
                },
            });

            map.addLayer({
                id: "posts-cluster-count",
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
                id: "post-point",
                type: "circle",
                source: "posts",
                filter: ["!", ["has", "point_count"]],
                paint: {
                    "circle-color": fullConfig.theme?.colors?.cta,
                    "circle-radius": 8,
                    "circle-stroke-width": 1,
                    "circle-stroke-color": "#fff",
                },
            });

            map.on("click", "post-point", (e) => {
                if (!e || !e.features || e.features.length < 0) return;
                const feature = e.features[0];
                if (!feature) return;
                const postId = feature.properties?.id as string;
                void router.push(`/posts/${postId}`);
            });

            map.on("click", "posts-clusters", (e) => {
                if (!e || !e.features || e.features.length < 0) return;
                const feature = e.features[0];
                if (!feature) return;

                const clusterCenterCoordinates =
                    feature.geometry.type === "Point"
                        ? feature.geometry.coordinates
                        : null;
                if (!clusterCenterCoordinates) return;

                const flyToOptions: FlyToOptions = {
                    center: clusterCenterCoordinates as [number, number],
                    duration: 1500,
                };

                const zoom = map.getZoom();
                const maxZoom = 12;
                // remove 0.2 to upgrade fluidity
                if (zoom < maxZoom - 0.2) {
                    map.flyTo({
                        ...flyToOptions,
                        zoom: getNewZoomedValue({
                            zoom,
                            min: 5,
                            max: maxZoom,
                        }),
                    });
                    return;
                }

                const clusterId = feature.properties?.cluster_id;
                const clusterSource = map.getSource("posts") as GeoJSONSource;
                clusterSource.getClusterLeaves(
                    +clusterId,
                    1000,
                    0,
                    (error, features) => {
                        if (!error) {
                            const postsIds = features.map(
                                (feature) => feature.properties?.id as string
                            );
                            dispatch(setSelectedPosts({ postsIds }));
                            return;
                        }
                        console.error(error);
                    }
                );
            });

            map.on("mouseenter", ["posts-clusters", "post-point"], () => {
                map.getCanvas().style.cursor = "pointer";
            });
            map.on("mouseleave", ["posts-clusters", "post-point"], () => {
                map.getCanvas().style.cursor = "";
            });

            map.on("click", () => {
                if (posts.length > 0) {
                    dispatch(setSelectedPosts({ postsIds: [] }));
                }
            });
        };

        map.on("load", () => handleMapLoad(map));
        map.addControl(new mapboxgl.NavigationControl(), "top-left");
        map.addControl(new mapboxgl.GeolocateControl(), "top-left");

        return () => map.remove();
    }, [isMobile]);

    return (
        <>
            {!isGeolocationAvailable && <GeolocationFallback />}
            <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
        </>
    );
};

export default MapComponent;
