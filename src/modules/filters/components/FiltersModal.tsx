import ModalComponent from "modules/ui/modal";
import CreatedAt from "./CreatedAt";
import DatesFilter from "./Dates";

type FiltersModalProps = {
    isOpened: boolean;
    onClose: () => void;
};

const FiltersModal = ({ isOpened, onClose }: FiltersModalProps) => {
    return (
        <ModalComponent
            title="Tous les filtres"
            show={isOpened}
            onClose={onClose}
        >
            <div className="flex flex-col gap-4 ">
                <CreatedAt />
                <DatesFilter />
            </div>
        </ModalComponent>
    );
};

export default FiltersModal;
