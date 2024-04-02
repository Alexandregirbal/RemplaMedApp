import type { Connection } from "mongoose";
import mongoose from "mongoose";
import { env } from "../../env.mjs";

const createMongooseConnection = async (): Promise<mongoose.Connection> => {
    const options = {
        useCreateIndex: true,
        bufferCommands: false,
    };
    const connectionResult = await mongoose.connect(env.MONGODB_URL, options);
    console.log("MongoDB connected");
    return connectionResult.connection;
};

let connection: Connection;

export const getMongooseConnection = async () => {
    if (!connection) {
        connection = await createMongooseConnection();
    }
    return connection;
};
