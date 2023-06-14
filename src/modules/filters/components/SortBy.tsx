import { useDispatch, useSelector } from "react-redux";
import { selectFiltersState, setSortBy } from "store/slices/filters/slice";
import { isSortBy } from "store/slices/filters/types";
import { sortPostsByDate, sortPostsByDistance } from "store/slices/posts/slice";

const options = [
    { display: "proximité", value: "distance" },
    { display: "date du poste", value: "date" },
];

const DatesFilter = () => {
    const { sortBy } = useSelector(selectFiltersState);
    const dispatch = useDispatch();

    const handleOptionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        if (isSortBy(event.target.value)) {
            dispatch(setSortBy(event.target.value));
            if (event.target.value === "distance") {
                navigator.geolocation.getCurrentPosition((pos) => {
                    dispatch(
                        sortPostsByDistance({
                            currentPosition: {
                                latitude: pos.coords.latitude,
                                longitude: pos.coords.longitude,
                            },
                        })
                    );
                });
            }
            if (event.target.value === "date") {
                dispatch(sortPostsByDate());
            }
        }
    };
    return (
        <div className="flex items-center gap-1 hover:cursor-pointer">
            <span>Trier par</span>
            <select
                id="sortBy"
                className="rounded-lg border-0  p-2 font-bold text-cta hover:cursor-pointer focus:border-cta focus:ring-cta"
                value={sortBy}
                onChange={handleOptionChange}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="text-primary"
                    >
                        {option.display}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DatesFilter;
