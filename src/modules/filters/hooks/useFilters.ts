import { useDispatch, useSelector } from "react-redux";
import {
    isCreatedAtFilterSet,
    isDatesFilterSet,
} from "store/slices/filters/isSet";
import {
    resetCreatedAt,
    resetDates,
    selectFiltersState,
    setCreatedAt,
    setDates,
} from "store/slices/filters/slice";
import type { FiltersState } from "store/slices/filters/types";
import {
    resetFilteredPosts,
    selectPostsState,
    setFilteredPosts,
} from "store/slices/posts/slice";
import { filterByCreatedAt } from "../services/filterByCreatedAt";
import { filterByDateFromDateTo } from "../services/filterByDateFromDateTo";

type Filter = {
    name: keyof FiltersState;
    value: FiltersState[keyof FiltersState];
};

export const useFilters = () => {
    const dispatch = useDispatch();
    const { data, filteredPosts } = useSelector(selectPostsState);
    const { dates, createdAt } = useSelector(selectFiltersState);

    /**
     * Adds a filter to the **filters store**
     * and sets the filteredPosts on the **posts store**
     * @returns The number of filtered posts
     */
    const upsertFilter = (filter: Filter): number => {
        let filterValue: FiltersState[keyof FiltersState];
        switch (filter.name) {
            case "createdAt":
                filterValue = filter.value as FiltersState["createdAt"];
                dispatch(
                    setCreatedAt({
                        ...filterValue,
                    })
                );
                break;

            case "dates":
                filterValue = filter.value as FiltersState["dates"];
                dispatch(
                    setDates({
                        ...filterValue,
                    })
                );
                break;

            default:
                throw new Error(`Filter name not found.`);
        }

        let postsData = data;
        for (const filterName of ["createdAt", "dates"]) {
            if (isCreatedAtFilterSet(createdAt) || filterName === "createdAt") {
                postsData = filterByCreatedAt(
                    postsData,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    filter.name === "createdAt"
                        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          filter.value.value
                        : createdAt.value
                );
            }
            if (isDatesFilterSet(dates) || filterName === "dates") {
                postsData = filterByDateFromDateTo({
                    posts: postsData,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    datesFilter: filter.name === "dates" ? filter.value : dates,
                });
            }
        }
        dispatch(setFilteredPosts(postsData));
        return postsData.length;
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
        resetFilters,
    };
};
