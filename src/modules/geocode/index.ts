// DOC: https://geo.api.gouv.fr/decoupage-administratif/communes#communes-list

import axios from "axios";
import {
    communeSchema,
    type Commune,
    type GeocodeData,
    type GetCommunesParams,
    geocodeDataSchema,
} from "./types";

const getCommunes = async (params: GetCommunesParams): Promise<Commune[]> => {
    const query = Object.keys(params)
        .map((key) => {
            key as keyof GetCommunesParams;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore next line
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            return `${key}=${params[key]}`;
        })
        .join("&");

    const response = await axios.get(
        `https://geo.api.gouv.fr/communes${query ? `?${query}` : ""}`
    );

    if (response.status !== 200) {
        throw new Error("geo.api.gouv did not return 200");
    }
    const parsedCommunes = communeSchema.array().safeParse(response.data);
    if (!parsedCommunes.success) {
        console.log(JSON.stringify(parsedCommunes.error, null, 2));
        throw new Error("Invalid data");
    }
    return parsedCommunes.data;
};

export const getGeocodeDataFromPostalCode = async (
    postalCode: string
): Promise<GeocodeData[]> => {
    const result = await getCommunes({
        codePostal: postalCode,
        fields: ["centre", "codesPostaux"],
    });

    if (!result) {
        throw new Error("No result found");
    }
    const geocodeData = result.reduce<GeocodeData[]>((acc, commune) => {
        if (
            commune.codesPostaux &&
            commune.codesPostaux[0] &&
            commune.codesPostaux.includes(postalCode) &&
            commune.centre &&
            commune.centre.coordinates &&
            commune.centre.coordinates[0] &&
            commune.centre.coordinates[1]
        ) {
            acc.push({
                city: commune.nom,
                postalCode: commune.codesPostaux[0],
                longitude: commune.centre.coordinates[0],
                latitude: commune.centre.coordinates[1],
            });
        }
        return acc;
    }, []);

    const parsedGeoCodeData = geocodeDataSchema.array().safeParse(geocodeData);
    if (!parsedGeoCodeData.success) {
        throw new Error("Invalid data");
    }

    return parsedGeoCodeData.data;
};
