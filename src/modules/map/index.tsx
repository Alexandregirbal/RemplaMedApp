/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Feature, FeatureCollection } from "geojson";
import mapboxgl, { type FlyToOptions, type GeoJSONSource } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { PostWithAuthorName } from "modules/post/types/post";
import { useEffect, useRef, useState } from "react";
import { type ViewState, type ViewStateChangeEvent } from "react-map-gl";
import { useDispatch } from "react-redux";
import { setSelectedPost, setSelectedPosts } from "store/slices/posts/slice";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.cjs";
import { useRouter } from "next/router";

const fullConfig = resolveConfig(tailwindConfig);

type MapComponentProps = {
    posts: PostWithAuthorName[];
};

const getNewZoomedValue = (zoom: number) =>
    Math.max(Math.min(zoom + Math.exp(zoom / 5), 12), 0);

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
    const router = useRouter();

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
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
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

            const clusterCenterCoordinates = (feature.geometry as any)
                .coordinates;

            const flyToOptions: FlyToOptions = {
                center: clusterCenterCoordinates,
                duration: 1500,
            };

            const zoom = map.getZoom();
            if (zoom < 12) {
                map.flyTo({
                    ...flyToOptions,
                    zoom: getNewZoomedValue(zoom),
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
                    }
                }
            );
        });

        map.on("mouseenter", ["posts-clusters", "post-point"], () => {
            map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", ["posts-clusters", "post-point"], () => {
            map.getCanvas().style.cursor = "";
        });
    };

    mapboxgl.accessToken =
        "pk.eyJ1IjoiYWxleGFuZHJlZ2lyYmFsIiwiYSI6ImNsaHc2cHBmNjBndDkzZXF3dGM2ODh1c3YifQ.AhMdlbtUvHC2ucOOwRwsYw";
    const mapContainer = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [2.4338675388986273, 46.77177190772532],
            zoom: 5,
            bearing: 0,
            pitch: 0,
        });

        map.on("load", () => handleMapLoad(map));

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
            <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
        </>
    );
};

export default MapComponent;
