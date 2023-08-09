import type { Feature, FeatureCollection } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import type { PostWithAuthorName } from "modules/post/types/post";

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

export const postsToGeoJSON = (
    posts: PostWithAuthorName[]
): FeatureCollection => {
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
