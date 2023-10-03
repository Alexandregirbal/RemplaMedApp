import type { PostWithAuthorName } from "modules/post/types/post";
import { useDispatch, useSelector } from "react-redux";
import { setCreatedAt, setDates } from "store/slices/filters/slice";
import type { FiltersState } from "store/slices/filters/types";
import { selectPostsState, setFilteredPosts } from "store/slices/posts/slice";

type Filter = {
    filterState: {
        name: keyof FiltersState;
        value: Partial<FiltersState[keyof FiltersState]>;
    };
    postsIds: Array<PostWithAuthorName["id"]>;
    operator?: "or" | "and";
};

export const useFilters = () => {
    const dispatch = useDispatch();
    const { data, filteredPosts } = useSelector(selectPostsState);

    /**
     * Adds a filter to the **filters store**
     * and sets the filteredPosts on the **posts store**
     * @returns The number of filtered posts
     */
    const addFilter = (filter: Filter): number => {
        switch (filter.filterState.name) {
            case "createdAt":
                dispatch(
                    setCreatedAt({
                        ...(filter.filterState
                            .value as FiltersState["createdAt"]),
                        postsIds: filter.postsIds,
                    })
                );
                break;

            case "dates":
                dispatch(
                    setDates({
                        ...(filter.filterState.value as FiltersState["dates"]),
                        postsIds: filter.postsIds,
                    })
                );
                break;

            default:
                throw new Error(`Filter name not found.`);
        }

        const postsData = filteredPosts.length === 0 ? data : filteredPosts;

        const newFilteredPosts = postsData.filter((post) =>
            filter.postsIds.includes(post.id)
        );
        dispatch(setFilteredPosts(newFilteredPosts));
        return newFilteredPosts.length;
    };

    /**
     * Removes a filter by its name from the **filters store**
     * and sets the filteredPosts on the **posts store**
     * @returns The new number of filtered posts
     */
    const removeFilter = (
        filterName: Filter["filterState"]["name"]
    ): number => {
        console.log(
            `~~~~~ LOG by Girbal | removeFilter | filterName: `,
            filterName
        );
        return 0;
    };

    /**
     * Resets the filters on the **filters store** to an empty array
     */
    const resetFilters = (): void => {
        dispatch(setFilteredPosts([]));
    };

    return {
        addFilter,
        removeFilter,
        resetFilters,
    };
};
