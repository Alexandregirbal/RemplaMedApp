"use client";

import { type ChangeEventHandler } from "react";
import { useFilters } from "../hooks/useFilters";

const ViewedFilter = () => {
    const { upsertFilter } = useFilters();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        upsertFilter({ name: "notViewed", value: event.target.checked });
    };

    return (
        <div className="flex items-center gap-2 ">
            <label htmlFor="viewedFilter" className="w-3/4">
                {"Voir seulement les posts que vous n'avez pas encore vu:"}
            </label>
            <input
                type="checkbox"
                className="rounded border-gray-300 text-cta focus:ring-cta"
                onChange={handleChange}
            />
        </div>
    );
};

export default ViewedFilter;
