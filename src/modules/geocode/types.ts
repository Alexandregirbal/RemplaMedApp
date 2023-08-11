import { z } from "zod";

export const geocodeDataSchema = z.object({
    city: z.string(),
    postalCode: z.string(),
    longitude: z.number(),
    latitude: z.number(),
});

export const centreSchema = z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number()),
});

export const mairieSchema = z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number()),
});

export const contourSchema = z.object({
    type: z.literal("Polygon"),
    coordinates: z.array(z.array(z.array(z.number()))),
});

export const bboxSchema = z.object({
    type: z.literal("Polygon"),
    coordinates: z.array(z.number()).length(4),
});

export const epciSchema = z.object({
    code: z.string(),
    nom: z.string(),
});

export const departementSchema = z.object({
    code: z.string(),
    nom: z.string(),
});

export const regionSchema = z.object({
    code: z.string(),
    nom: z.string(),
});

export const communeFields = z.object({
    code: z.string(),
    nom: z.string(),
    centre: centreSchema.optional(),
    mairie: mairieSchema.optional(),
    contour: contourSchema.optional(),
    bbox: bboxSchema.optional(),
    siren: z.string().optional(),
    codeEpci: z.string().optional(),
    codeDepartement: z.string().optional(),
    codeRegion: z.string().optional(),
    surface: z.number().optional(),
    population: z.number().optional(),
    codesPostaux: z.array(z.string()).optional(),
    epci: epciSchema.optional(),
    departement: departementSchema.optional(),
    region: regionSchema.optional(),
    zone: z.string().optional(),
});

export const getCommunesParamsSchema = z.object({
    codePostal: z.string().optional(),
    lon: z.number().optional(),
    lat: z.number().optional(),
    nom: z.string().optional(),
    boost: z.string().optional(),
    code: z.string().optional(),
    siren: z.string().optional(),
    codeEpci: z.string().optional(),
    codeDepartement: z.string().optional(),
    codeRegion: z.string().optional(),
    zone: z.array(z.string()).optional(),
    type: z.array(z.string()).optional(),
    fields: z.array(communeFields.keyof()).optional(),
    format: z.enum(["json", "geojson"]).optional(),
    geometry: z.enum(["centre", "contour", "bbox", "mairie"]).optional(),
});

export const communeSchema = communeFields.extend({
    _score: z.number().optional(),
});

export type GeocodeData = z.infer<typeof geocodeDataSchema>;
export type GetCommunesParams = z.infer<typeof getCommunesParamsSchema>;
export type Commune = z.infer<typeof communeSchema>;
