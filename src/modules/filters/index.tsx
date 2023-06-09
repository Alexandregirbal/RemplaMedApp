import DisplayMode from "./components/DisplayMode";
import SortBy from "./components/SortBy";

const Filters = () => {
    return (
        <div className="flex h-20 justify-around rounded-lg shadow-xl">
            <DisplayMode />
            {/* <Dates /> */}
            <SortBy />
        </div>
    );
};
export default Filters;
