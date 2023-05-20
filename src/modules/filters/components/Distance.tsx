import { useDispatch, useSelector } from "react-redux";
import { selectFiltersState, setDistance } from "store/slices/filters/slice";

const distances = [5, 10, 20, 50, 80, 100, 150, 1000];

const DistanceFilter = () => {
    const { distance } = useSelector(selectFiltersState);
    const dispatch = useDispatch();

    const handleOptionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const parsedDistance = parseInt(event.target.value);
        dispatch(setDistance(parsedDistance));
    };

    return (
        <div className="flex gap-1 text-cta ">
            <select
                id="distance"
                className="block rounded-lg border border-gray-300 p-2 font-bold hover:cursor-pointer focus:border-cta focus:ring-cta"
                defaultValue={distance}
                onChange={handleOptionChange}
            >
                {distances.map((distance) => (
                    <option
                        key={distance}
                        value={distance}
                        className="text-primary"
                    >
                        {distance} km
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DistanceFilter;
