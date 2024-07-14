import { Schema } from "mongoose";
import { SCHEMA_OPTIONS } from "server/database/constants";
import type { User } from "./types";

export const userSchema = new Schema<User>(
    {
        name: { type: String, required: false },
        email: { type: String, required: false },
        password: { type: String, required: false },
        emailVerified: { type: Date, required: false },
        image: { type: String, required: false },
        description: { type: String, required: true },
        phoneNumber: { type: String, required: false },
        accounts: { type: [String], required: false },
        sessions: { type: [String], required: false },
        posts: { type: [String], required: false },
        roles: { type: [String], required: false },
        postsViewed: { type: [String], required: true },
    },
    SCHEMA_OPTIONS
);
