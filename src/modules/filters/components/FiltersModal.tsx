import ModalComponent from "modules/ui/modal";
import CreatedAt from "./CreatedAt";
import DatesFilter from "./Dates";
import { useFilters } from "../hooks/useFilters";

type FiltersModalProps = {
    isOpened: boolean;
    onClose: () => void;
};

const FiltersModal = ({ isOpened, onClose }: FiltersModalProps) => {
    const { resetFilters } = useFilters();
    const handeResetFilters = () => {
        resetFilters();
        onClose();
    };
    return (
        <ModalComponent
            title="Tous les filtres"
            show={isOpened}
            onClose={onClose}
        >
            <div className="flex flex-col gap-4 ">
                <CreatedAt />
                <DatesFilter />
                <div className=" mt-4 flex justify-center">
                    <button
                        className=" rounded-lg bg-tertiary px-4 py-2.5 text-center font-medium text-white "
                        onClick={handeResetFilters}
                    >
                        Supprimer tous les filtres
                    </button>
                </div>
            </div>
        </ModalComponent>
    );
};

export default FiltersModal;
