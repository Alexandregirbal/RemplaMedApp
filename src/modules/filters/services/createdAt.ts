import dayjs from "dayjs";
import type { PostWithAuthorName } from "modules/post/types/post";

export const filterByCreatedAt = (
    posts: PostWithAuthorName[],
    createdAt: number
) => {
    return createdAt <= 0
        ? posts
        : posts.filter((post) =>
              dayjs(post.createdAt).isAfter(
                  dayjs().subtract(createdAt, "hours")
              )
          );
};
