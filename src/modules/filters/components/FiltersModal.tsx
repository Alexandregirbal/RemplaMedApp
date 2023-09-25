import { Modal } from "flowbite-react";
import CreatedAt from "./CreatedAt";
import DatesFilter from "./Dates";

type FiltersModalProps = {
    isOpened: boolean;
    onClose: () => void;
};

const FiltersModal = ({ isOpened, onClose }: FiltersModalProps) => {
    return (
        <>
            <Modal dismissible show={isOpened} onClose={() => onClose()}>
                <Modal.Header>Tous les filtres</Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col gap-4 ">
                        <CreatedAt />
                        <DatesFilter />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FiltersModal;
