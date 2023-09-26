import FiltersIcon from "modules/ui/icons/filters";
import CreatedAt from "./components/CreatedAt";
import FiltersModal from "./components/FiltersModal";
import { useState } from "react";

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
                <FiltersIcon onClick={openFiltersModal} />
                <CreatedAt />
            </div>
            <FiltersModal
                isOpened={isFiltersModalOpened}
                onClose={closeFiltersModal}
            />
        </>
    );
};
export default Filters;
