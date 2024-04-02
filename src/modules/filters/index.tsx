import FiltersIcon from "modules/ui/icons/filters";
import { useState } from "react";
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
            <div className="flex h-16 items-center justify-around gap-2 border-t-2 border-gray-300 px-4 shadow-2xl">
                <div
                    className="flex gap-2 text-cta hover:cursor-pointer"
                    onClick={openFiltersModal}
                >
                    <FiltersIcon />
                    Filtrer
                </div>
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
