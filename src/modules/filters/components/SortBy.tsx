import { useDispatch, useSelector } from "react-redux";
import { selectFiltersState, setSortBy } from "store/slices/filters/slice";
import { isSortBy } from "store/slices/filters/types";
import { sortPostsByDistance } from "store/slices/posts/slice";

const options = [
    { display: "Proximité", value: "distance" },
    { display: "Date de publication", value: "createdAt" },
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
                dispatch(
                    sortPostsByDistance({
                        currentPosition: {
                            latitude: 0, // TODO get current position
                            longitude: 0,
                        },
                    })
                );
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
