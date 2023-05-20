import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFiltersState, setDates } from "store/slices/filters/slice";

const DatesFilter = () => {
    const {
        dates: { from, to },
    } = useSelector(selectFiltersState);
    const dispatch = useDispatch();

    const fromRef = useRef<HTMLInputElement>(null);
    const toRef = useRef<HTMLInputElement>(null);

    const showFromPicker = () => {
        if (fromRef.current) {
            fromRef.current.showPicker();
        }
    };
    const handleDateFromChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newFrom =
            event.target.value === "" ? null : new Date(event.target.value);
        dispatch(
            setDates({
                from: newFrom,
                to,
            })
        );
    };

    const showToPicker = () => {
        if (toRef.current) {
            toRef.current.showPicker();
        }
    };
    const handleDateToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTo =
            event.target.value === "" ? null : new Date(event.target.value);
        dispatch(
            setDates({
                from,
                to: newTo,
            })
        );
    };

    return (
        <div className="flex items-center gap-2">
            <span
                className="flex cursor-pointer items-center gap-2"
                onClick={showFromPicker}
            >
                Du
                <input
                    onClick={showFromPicker}
                    ref={fromRef}
                    value={from?.toISOString().slice(0, 10)}
                    onChange={handleDateFromChange}
                    type="date"
                    className={
                        "w-9/12 cursor-pointer border-0 p-0 text-cta" +
                        (from ? " font-bold" : "")
                    }
                />
            </span>
            <span
                className="flex cursor-pointer items-center gap-2"
                onClick={showToPicker}
            >
                Au
                <input
                    onClick={showToPicker}
                    ref={toRef}
                    value={to?.toISOString().slice(0, 10)}
                    onChange={handleDateToChange}
                    type="date"
                    className={
                        "w-9/12 cursor-pointer border-0 p-0 text-cta" +
                        (to ? " font-bold" : "")
                    }
                />
            </span>
        </div>
    );
};

export default DatesFilter;
