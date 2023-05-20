import { useDispatch, useSelector } from "react-redux";
import { selectFiltersState, setDisplayMode } from "store/slices/filters/slice";

const DatesFilter = () => {
    const filters = useSelector(selectFiltersState);
    const dispatch = useDispatch();
    const { displayMode } = filters;

    const handleClick = () => {
        if (displayMode === "list") {
            dispatch(setDisplayMode("map"));
        } else {
            dispatch(setDisplayMode("list"));
        }
    };

    return (
        <div
            className="flex gap-1 text-button hover:cursor-pointer"
            onClick={handleClick}
        >
            <span className={displayMode === "list" ? "font-bold" : ""}>
                Liste
            </span>
            <span>|</span>
            <span className={displayMode === "map" ? "font-bold" : ""}>
                Carte
            </span>
        </div>
    );
};

export default DatesFilter;
