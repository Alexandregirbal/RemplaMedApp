/* eslint-disable react-hooks/exhaustive-deps */
import type { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import mapboxgl, { type FlyToOptions, type GeoJSONSource } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/router";
import { useEffect, useState, type RefObject } from "react";
import { useDispatch } from "react-redux";
import { setSelectedPosts } from "store/slices/posts/slice";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config.cjs";
import { getNewZoomedValue } from "../utils/zoom";

const MAPBOX_IDS = {
    posts: "posts",
    postsClusters: "posts-clusters",
    postsClusterCount: "posts-cluster-count",
    postPoint: "post-point",
};

export const useMap = (params: {
    mapContainer: RefObject<HTMLInputElement>;
    data: FeatureCollection<Geometry, GeoJsonProperties>;
}) => {
    const fullConfig = resolveConfig(tailwindConfig);

    const { mapContainer, data } = params;
    const [isGeolocationAvailable, setIsGeolocationAvailable] =
        useState<boolean>(true);

    const [map, setMap] = useState<mapboxgl.Map | null>(null);

    const dispatch = useDispatch();
    const router = useRouter();

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

        const mapboxClient = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [2.4338675388986273, 46.77177190772532], // Bruère-Allichamps
            zoom: 5,
            bearing: 0,
            pitch: 0,
        });
        const handleMapLoad = (map: mapboxgl.Map) => {
            map.addSource(MAPBOX_IDS.posts, {
                type: "geojson",
                data,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50,
            });

            map.addLayer({
                id: MAPBOX_IDS.postsClusters,
                type: "circle",
                source: MAPBOX_IDS.posts,
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
                id: MAPBOX_IDS.postsClusterCount,
                type: "symbol",
                source: MAPBOX_IDS.posts,
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
                id: MAPBOX_IDS.postPoint,
                type: "circle",
                source: MAPBOX_IDS.posts,
                filter: ["!", ["has", "point_count"]],
                paint: {
                    "circle-color": fullConfig.theme?.colors?.cta,
                    "circle-radius": 8,
                    "circle-stroke-width": 1,
                    "circle-stroke-color": "#fff",
                },
            });

            map.on("click", MAPBOX_IDS.postPoint, (e) => {
                if (!e || !e.features || e.features.length < 0) return;
                const feature = e.features[0];
                if (!feature) return;
                const postId = feature.properties?.id as string;
                void router.push(`/posts/${postId}`);
            });

            map.on("click", MAPBOX_IDS.postsClusters, (e) => {
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

                const clusterId = feature.properties?.cluster_id as string;
                const clusterSource = map.getSource(
                    MAPBOX_IDS.posts
                ) as GeoJSONSource;

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

            map.on(
                "mouseenter",
                [MAPBOX_IDS.postsClusters, MAPBOX_IDS.postPoint],
                () => {
                    map.getCanvas().style.cursor = "pointer";
                }
            );
            map.on(
                "mouseleave",
                [MAPBOX_IDS.postsClusters, MAPBOX_IDS.postPoint],
                () => {
                    map.getCanvas().style.cursor = "";
                }
            );

            map.on("click", () => {
                dispatch(setSelectedPosts({ postsIds: [] }));
            });
        };

        mapboxClient.on("load", () => handleMapLoad(mapboxClient));
        mapboxClient.addControl(new mapboxgl.NavigationControl(), "top-left");
        mapboxClient.addControl(new mapboxgl.GeolocateControl(), "top-left");

        setMap(mapboxClient);

        return () => mapboxClient.remove();
    }, []);

    useEffect(() => {
        if (!map) return;
        const mapSource = map.getSource(MAPBOX_IDS.posts) as GeoJSONSource;
        if (!mapSource) return;
        mapSource.setData(data);
    }, [data]);

    return { isGeolocationAvailable };
};
