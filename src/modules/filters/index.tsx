import { Filter } from "lucide-react";
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
            <div className="flex h-16 items-center justify-evenly border-t-2 border-gray-300 shadow-2xl">
                <Button
                    className="flex w-36 gap-2 bg-cta text-xl hover:cursor-pointer"
                    onClick={openFiltersModal}
                >
                    <Filter />
                    Filtrer
                </Button>
                <PostalCodeFinder />
            </div>
            <FiltersModal
                isOpened={isFiltersModalOpened}
                onClose={closeFiltersModal}
            />
        </>
    );
};
export default Filters;
