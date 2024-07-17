/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Types } from "mongoose";

export const parseObjectToSerialize = <T extends Record<string, unknown>>(
    object: T
) => {
    const newObject = { ...object };
    for (const key in newObject) {
        const value = newObject[key];
        if (!value) continue;
        if (value instanceof Types.ObjectId) {
            // @ts-ignore
            newObject[key] = value.toString();
        }
        if (value instanceof Date) {
            // @ts-ignore
            newObject[key] = value.toISOString();
        }
    }
    return newObject;
};
