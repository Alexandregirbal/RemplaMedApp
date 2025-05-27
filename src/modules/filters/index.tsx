"use client";

import { Filter } from "lucide-react";
import AddPostButton from "modules/post/components/AddPostButton";
import { useState } from "react";
import { Button } from "shadcn/components/ui/button";
import FiltersModal from "./components/FiltersModal";
import PostalCodeFinder from "./components/PostalCodeFinder";

const Filters = () => {
    const [isFiltersModalOpened, setIsFiltersModalOpened] = useState(false);
    const openFiltersModal = () => {
        setIsFiltersModalOpened(true);
    };
    const closeFiltersModal = () => {
        setIsFiltersModalOpened(false);
    };
    return (
        <>
            <div className="flex items-center justify-evenly py-2">
                <Button
                    className="flex gap-2 bg-cta hover:cursor-pointer"
                    onClick={openFiltersModal}
                >
                    <Filter />
                    Filtrer
                </Button>
                <PostalCodeFinder />
                <AddPostButton />
            </div>
            <FiltersModal
                isOpened={isFiltersModalOpened}
                onClose={closeFiltersModal}
            />
        </>
    );
};
export default Filters;
