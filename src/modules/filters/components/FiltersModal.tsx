import { Modal } from "flowbite-react";
import CreatedAt from "./CreatedAt";

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
                    <div className="space-y-6 ">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <CreatedAt />
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FiltersModal;
