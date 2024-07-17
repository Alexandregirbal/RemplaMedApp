import { Schema } from "mongoose";
import { SCHEMA_OPTIONS } from "server/database/constants";
import type { Post } from "./types";

export const postSchema = new Schema<Post>(
    {
        authorId: { type: String, required: true },
        published: { type: Boolean, required: true, default: false },
        intent: { type: String, required: true },
        title: { type: String, required: false },
        postalCode: { type: String, required: true },
        city: { type: String, required: false },
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
        message: { type: String, required: true },
        availablityFrom: { type: String, required: true },
        availablityTo: { type: String, required: false },
        views: { type: Number, required: true, default: 0 },
        source: { type: String, required: false },
        paymentId: { type: String, required: false },
        paymentStatus: { type: String, required: false },
    },
    SCHEMA_OPTIONS
);
