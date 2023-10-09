import CloseIcon from "./icons/close";

type ModalProps = {
    title: string;
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const ModalComponent = ({ title, show, onClose, children }: ModalProps) => {
    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[rgba(171,171,171,0.7)] p-4 ${
                show ? "" : "hidden"
            }`}
            onClick={handleClickOutside}
        >
            <div className=" mx-auto w-full max-w-md rounded-md bg-white  shadow-lg ">
                <div className="flex items-center justify-between border-b p-4 dark:border-gray-600">
                    <h5 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300">
                        {title}
                    </h5>
                    <button
                        type="button"
                        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 focus:outline-none dark:hover:bg-gray-600 dark:hover:text-gray-300"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

export default ModalComponent;
