import FiltersIcon from "modules/ui/icons/filters";
import CreatedAt from "./components/CreatedAt";

const Filters = () => {
    return (
        <div className="flex h-16 items-center justify-around border-t-2 border-gray-300 px-4 shadow-2xl">
            <FiltersIcon />
            <CreatedAt />
        </div>
    );
};
export default Filters;
