import { useDispatch, useSelector } from "react-redux";

import {
    resetFiltersSlice,
    selectFiltersState,
    setCreatedAt,
    setDates,
    setIntent,
    setNotViewed,
} from "store/slices/filters/slice";
import type { FiltersState } from "store/slices/filters/types";
import {
    isCreatedAtFilterSet,
    isDatesFilterSet,
    isIntentFilterSet,
    isNotViewedFilterSet,
} from "store/slices/filters/utils";
import { selectPostsState, setFilteredPosts } from "store/slices/posts/slice";
import { selectUserState } from "store/slices/user/slice";
import { filterByCreatedAt } from "../services/filterByCreatedAt";
import { filterByDateFromDateTo } from "../services/filterByDateFromDateTo";

type Filter = {
    name: keyof FiltersState;
    value: FiltersState[keyof FiltersState];
};

export const useFilters = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(selectPostsState);
    const { postsViewed } = useSelector(selectUserState);
    const { dates, createdAt, notViewed, intent } =
        useSelector(selectFiltersState);

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

            case "notViewed":
                filterValue = filter.value as FiltersState["notViewed"];
                dispatch(setNotViewed(filterValue));
                break;

            case "intent":
                filterValue = filter.value as FiltersState["intent"];
                dispatch(setIntent(filterValue));
                break;

            default:
                throw new Error(`Filter name not found.`);
        }

        let postsData = data;
        for (const iteratingFilterName of [
            "createdAt",
            "dates",
            "notViewed",
            "intent",
        ]) {
            if (
                isCreatedAtFilterSet(createdAt) ||
                iteratingFilterName === "createdAt"
            ) {
                const filterValue = (
                    filter.name === "createdAt" ? filter.value : createdAt
                ) as FiltersState["createdAt"];
                postsData = filterByCreatedAt(postsData, filterValue.value);
            }

            if (isDatesFilterSet(dates) || iteratingFilterName === "dates") {
                const filterValue = (
                    filter.name === "dates" ? filter.value : dates
                ) as FiltersState["dates"];
                postsData = filterByDateFromDateTo({
                    posts: postsData,
                    datesFilter: filterValue,
                });
            }

            if (
                isNotViewedFilterSet(notViewed) ||
                iteratingFilterName === "notViewed"
            ) {
                const filterValue = (
                    filter.name === "notViewed" ? filter.value : notViewed
                ) as FiltersState["notViewed"];
                if (filterValue) {
                    postsData = postsData.filter(
                        (post) => !postsViewed.includes(post._id.toString())
                    );
                }
            }

            if (isIntentFilterSet(intent) || iteratingFilterName === "intent") {
                const filterValue = (
                    filter.name === "intent" ? filter.value : intent
                ) as FiltersState["intent"];
                if (filterValue) {
                    postsData = postsData.filter(
                        (post) => post.intent === filterValue
                    );
                }
            }

            // ADD new filters here
        }

        dispatch(setFilteredPosts(postsData));
        return postsData.length;
    };

    const resetFilters = (): void => {
        dispatch(resetFiltersSlice());
    };

    return {
        upsertFilter,
        resetFilters,
    };
};
