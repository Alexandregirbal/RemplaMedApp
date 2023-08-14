import dayjs from "dayjs";
import type { PostWithAuthorName } from "modules/post/types/post";

export const filterByCreatedAt = (
    posts: PostWithAuthorName[],
    createdAt: number
) => {
    if (createdAt <= 0) return posts;

    return posts.filter((post) =>
        dayjs(post.createdAt).isAfter(dayjs().subtract(createdAt, "hours"))
    );
};
