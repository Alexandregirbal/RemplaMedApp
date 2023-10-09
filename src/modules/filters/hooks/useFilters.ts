import { useDispatch, useSelector } from "react-redux";
import {
    resetCreatedAt,
    resetDates,
    setCreatedAt,
    setDates,
} from "store/slices/filters/slice";
import type { FiltersState } from "store/slices/filters/types";
import {
    addFilteredPosts,
    removeAppliedFilter,
    resetFilteredPosts,
    selectPostsState,
} from "store/slices/posts/slice";
import { filterByCreatedAt } from "../services/filterByCreatedAt";
import { filterByDateFromDateTo } from "../services/filterByDateFromDateTo";

type Filter = {
    name: keyof FiltersState;
    value: Partial<FiltersState[keyof FiltersState]>;
};

export const useFilters = () => {
    const dispatch = useDispatch();
    const { data, filteredPosts } = useSelector(selectPostsState);

    /**
     * Adds a filter to the **filters store**
     * and sets the filteredPosts on the **posts store**
     * @returns The number of filtered posts
     */
    const upsertFilter = (filter: Filter): number => {
        let postsIds: string[] = [];
        let filterValue: FiltersState[keyof FiltersState];
        removeFilter(filter.name);
        switch (filter.name) {
            case "createdAt":
                filterValue = filter.value as FiltersState["createdAt"];
                dispatch(
                    setCreatedAt({
                        ...filterValue,
                    })
                );
                postsIds = filterByCreatedAt(data, filterValue.value).map(
                    (post) => post.id
                );
                break;

            case "dates":
                filterValue = filter.value as FiltersState["dates"];
                dispatch(
                    setDates({
                        ...filterValue,
                    })
                );
                postsIds = filterByDateFromDateTo({
                    posts: data,
                    datesFilter: filterValue,
                }).map((post) => post.id);
                break;

            default:
                throw new Error(`Filter name not found.`);
        }

        const postsData =
            filteredPosts.value.length === 0 ? data : filteredPosts.value;

        const newFilteredPosts = postsData.filter((post) =>
            postsIds.includes(post.id)
        );
        dispatch(
            addFilteredPosts({
                name: filter.name,
                value: newFilteredPosts,
            })
        );
        return newFilteredPosts.length;
    };

    /**
     * Removes a filter by its name from the **filters store**
     * and sets the filteredPosts on the **posts store**
     */
    const removeFilter = (filterName: Filter["name"]): void => {
        dispatch(removeAppliedFilter(filterName));
    };

    /**
     * Resets the filters on the **filters store** to an empty array
     */
    const resetFilters = (): void => {
        dispatch(resetCreatedAt());
        dispatch(resetDates());

        dispatch(resetFilteredPosts());
    };

    return {
        upsertFilter,
        removeFilter,
        resetFilters,
    };
};
