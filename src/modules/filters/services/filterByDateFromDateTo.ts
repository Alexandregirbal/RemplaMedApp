import dayjs from "dayjs";
import type { PostWithAuthorName } from "modules/post/types/post";
import type { FiltersState } from "store/slices/filters/types";

export const filterByDateFromDateTo = (params: {
    posts: PostWithAuthorName[];
    datesFilter: Omit<FiltersState["dates"], "postsIds">;
}) => {
    const { posts, datesFilter } = params;
    if (!datesFilter.from && !datesFilter.to) return posts;

    if (!datesFilter.to) {
        return posts.filter((post) =>
            dayjs(post.availablityFrom).isAfter(datesFilter.from)
        );
    }

    if (!datesFilter.from) {
        return posts.filter((post) =>
            dayjs(post.availablityTo).isBefore(datesFilter.to)
        );
    }

    return posts.filter(
        (post) =>
            dayjs(post.availablityFrom).isAfter(datesFilter.from) &&
            dayjs(post.availablityTo).isBefore(datesFilter.to)
    );
};
