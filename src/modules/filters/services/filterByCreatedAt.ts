import dayjs from "dayjs";
import type { Post } from "server/database/models/post/types";

export const filterByCreatedAt = (posts: Post[], createdAt: number) => {
    if (createdAt <= 0) return posts;

    return posts.filter((post) =>
        dayjs(post.createdAt).isAfter(dayjs().subtract(createdAt, "hours"))
    );
};
