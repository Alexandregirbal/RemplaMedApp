import ModalComponent from "modules/ui/modal";
import { useFilters } from "../hooks/useFilters";
import CreatedAt from "./CreatedAt";
import DatesFilter from "./Dates";
import IntentFilter from "./Intent";
import ViewedFilter from "./Viewed";

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
                <IntentFilter />
                <ViewedFilter />
                <CreatedAt />
                <DatesFilter />
                <div className=" mt-4 flex justify-around">
                    <button
                        className=" rounded-lg bg-tertiary px-4 py-2.5 text-center font-medium text-white "
                        onClick={handeResetFilters}
                    >
                        Réinitialiser
                    </button>

                    <button
                        className=" rounded-lg bg-cta px-4 py-2.5 text-center font-medium text-white "
                        onClick={onClose}
                    >
                        Valider
                    </button>
                </div>
            </div>
        </ModalComponent>
    );
};

export default FiltersModal;
