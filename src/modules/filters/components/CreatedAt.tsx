"use client";

import { useSelector } from "react-redux";
import { selectFiltersState } from "store/slices/filters/slice";
import { useFilters } from "../hooks/useFilters";

const CreatedAt = () => {
    const { upsertFilter } = useFilters();
    const { createdAt } = useSelector(selectFiltersState);
    const options = [
        { value: 0, label: "Aucun filtre" },
        { value: 24, label: "1J | Posté dans les 24h" },
        { value: 24 * 3, label: "3J | Posté dans les 3 derniers jours" },
        { value: 24 * 7, label: "7J | Posté dans la semaine" },
        { value: 24 * 15, label: "15J | Posté dans les 2 dernières semaines" },
    ];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newOption = options.find((o) => o.value === +event.target.value);
        if (!newOption) return;
        upsertFilter({
            name: "createdAt",
            value: newOption,
        });
    };

    return (
        <div className="flex items-center gap-2 ">
            <label htmlFor="createdAtFilter" className="w-1/2">
                Filtrer par date de poste:
            </label>
            <select
                name="createdAtFilter"
                id="created-at"
                className="block w-1/2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                value={createdAt.value}
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
