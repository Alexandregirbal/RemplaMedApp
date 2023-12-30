"use client";

import { PostIntent } from "@prisma/client";
import { getPostIntentLabel } from "modules/post/services/postIntentLabels";
import { isPostIntent } from "modules/post/types/post";
import { type ChangeEventHandler } from "react";
import { useFilters } from "../hooks/useFilters";

const IntentFilter = () => {
    const { upsertFilter } = useFilters();

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const postIntent = event.target.value;
        if (!isPostIntent(postIntent)) {
            console.error("Invalid post intent");
            return;
        }
        upsertFilter({ name: "intent", value: postIntent });
    };

    return (
        <div className="flex items-center gap-2 ">
            <label htmlFor="intentFilter" className="w-1/2">
                {"Filtrer par intention de post:"}
            </label>
            <select
                name="intent"
                id="postIntent"
                className="block w-1/2 rounded-lg border border-gray-300  p-1.5 focus:border-cta focus:ring-cta"
                onChange={handleChange}
            >
                {Object.values(PostIntent).map((intent) => (
                    <option key={intent} value={intent}>
                        {getPostIntentLabel(intent)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default IntentFilter;
