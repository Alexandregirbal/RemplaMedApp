import type { Feature, FeatureCollection } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Post } from "server/database/models/post/types";

const postToGeoJson = (post: Post): Feature | null => {
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

export const postsToGeoJSON = (posts: Post[]): FeatureCollection => {
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
