import DisplayMode from "./components/DisplayMode";
import SortBy from "./components/SortBy";

const Filters = () => {
    return (
        <div className="flex h-16 justify-around border-t-2 border-gray-300 shadow-2xl">
            <DisplayMode />
            {/* <Dates /> */}
            <SortBy />
        </div>
    );
};
export default Filters;
