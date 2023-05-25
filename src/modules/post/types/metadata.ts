/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export type MetaData = {
    totalOverallPosts: number;
    totalRecentPosts: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMetaData = (data: any): data is MetaData => {
    return (
        typeof data.totalOverallPosts === "number" &&
        typeof data.totalRecentPosts === "number"
    );
};
