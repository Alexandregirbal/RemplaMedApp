import Dates from "./components/Dates";
import DisplayMode from "./components/DisplayMode";
import Distance from "./components/Distance";
import SortBy from "./components/SortBy";

const Filters = () => {
    return (
        <div className="flex h-20 justify-around rounded-lg shadow-xl">
            <DisplayMode />
            <Distance />
            <Dates />
            <SortBy />
        </div>
    );
};
export default Filters;
