"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostsState, setFilteredPosts } from "store/slices/posts/slice";
import { filterByCreatedAt } from "../services/createdAt";

const CreatedAt = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(selectPostsState);
    const options = [
        { value: 0, label: "Aucun filtre" },
        { value: 24, label: "Posté dans les 24h" },
        { value: 24 * 3, label: "Posté dans les 3 derniers jours" },
        { value: 24 * 7, label: "Posté dans la semaine (7j)" },
    ];

    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newOption = options.find((o) => o.value === +event.target.value);
        setSelectedOption(newOption);
        dispatch(
            setFilteredPosts(filterByCreatedAt(data, +event.target.value))
        );
    };
    return (
        <div className="flex items-center gap-2">
            <label htmlFor="createdAtFilter">Filtrer par date de poste:</label>
            <select
                name="createdAtFilter"
                id="created-at"
                className="block w-2/5 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={selectedOption?.value}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="text-primary"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CreatedAt;
