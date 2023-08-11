import axios from "axios";
import { isMetaData, type MetaData } from "../types/metadata";

export const getMetaData = async (): Promise<MetaData> => {
    const result = await axios.get("/api/posts/metadata");
    if (result.status !== 200) {
        throw new Error("Invalid status code");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const metadata = result.data.metadata;
    if (!isMetaData(metadata)) {
        throw new Error("Invalid metadata");
    }

    return metadata;
};
