"use client";

import { type ChangeEventHandler } from "react";

const ViewedFilter = () => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        console.log(event);
    };

    return (
        <div className="flex items-center gap-2 ">
            <label htmlFor="viewedFilter" className="w-3/4">
                {"Voir seulement les posts que vous n'avez pas encore vu:"}
            </label>
            <input type="checkbox" onChange={handleChange} />
        </div>
    );
};

export default ViewedFilter;
