import NodeGeocoder from "node-geocoder";
import type { BaseGeocodeData } from "./types";

export const getLocationFromPostalCode = async (
    postalCode: string
): Promise<BaseGeocodeData> => {
    const options: NodeGeocoder.Options = {
        provider: "mapbox",
        language: "fr",
        apiKey: "pk.eyJ1IjoiYWxleGFuZHJlZ2lyYmFsIiwiYSI6ImNsaHc2cHBmNjBndDkzZXF3dGM2ODh1c3YifQ.AhMdlbtUvHC2ucOOwRwsYw",
    };

    const geocoder = NodeGeocoder(options);
    const result = await geocoder.geocode(postalCode);
    const bestResult = result
        .filter((r) => r.country === "France")
        .map((r) => ({
            city: r.city,
            latitude: r.latitude,
            longitude: r.longitude,
        }))[0];
    if (!bestResult) {
        throw new Error("No result found");
    }

    return bestResult;
};
