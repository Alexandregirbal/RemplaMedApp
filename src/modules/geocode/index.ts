// DOC: https://geo.api.gouv.fr/decoupage-administratif/communes#communes-list

import axios from "axios";
import {
    communeSchema,
    geocodeDataSchema,
    type Commune,
    type GeocodeData,
    type GetCommunesParams,
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
        if (!commune.codesPostaux) {
            return acc;
        }
        const postalCodeResult: string | undefined = commune.codesPostaux.find(
            (code) => code === postalCode
        );

        const city = commune.nom;
        const [longitude, latitude] = commune?.centre?.coordinates ?? [];

        if (!postalCodeResult || !city || !longitude || !latitude) {
            return acc;
        }

        acc.push({
            city,
            postalCode: postalCodeResult,
            longitude,
            latitude,
        });

        return acc;
    }, []);

    const parsedGeoCodeData = geocodeDataSchema.array().safeParse(geocodeData);
    if (!parsedGeoCodeData.success) {
        throw new Error("Invalid data");
    }

    return parsedGeoCodeData.data;
};
