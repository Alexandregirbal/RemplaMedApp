import dayjs from "dayjs";
import type { PostWithAuthorName } from "modules/post/types/post";
import type { FiltersState } from "store/slices/filters/types";

export const filterByDateFromDateTo = (
    posts: PostWithAuthorName[],
    datesFilter: FiltersState["dates"]
) => {
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
