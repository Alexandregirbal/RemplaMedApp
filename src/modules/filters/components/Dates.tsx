import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { selectFiltersState, setDates } from "store/slices/filters/slice";

const DatesFilter = () => {
    const {
        dates: { from, to },
    } = useSelector(selectFiltersState);
    const dispatch = useDispatch();

    const handleDateFromChange = (date: Date | null) => {
        dispatch(
            setDates({
                from: date ? dayjs(date).format("YYYY-MM-DD") : null,
                to,
            })
        );
    };

    const handleDateToChange = (date: Date | null) => {
        dispatch(
            setDates({
                from,
                to: date ? dayjs(date).format("YYYY-MM-DD") : null,
            })
        );
    };

    const dateObjects = [
        {
            key: "dateFrom",
            date: from,
            min: null,
            handleDateChange: handleDateFromChange,
            label: "Disponible à partir du",
        },
        {
            key: "dateTo",
            date: to,
            min: from,
            handleDateChange: handleDateToChange,
            label: "Jusqu'au",
        },
    ];

    return (
        <div className="flex flex-col gap-4 whitespace-nowrap">
            {dateObjects.map(({ key, date, min, handleDateChange, label }) => (
                <div
                    key={key}
                    className="flex cursor-pointer items-center gap-2"
                >
                    <label>{label}</label>
                    <DatePicker
                        className="block w-24 rounded-lg border border-gray-300 bg-gray-50 p-2 text-center focus:border-cta focus:ring-cta"
                        selected={date ? dayjs(date).toDate() : null}
                        minDate={min ? dayjs(min).toDate() : null}
                        onChange={handleDateChange}
                        dateFormat={"dd/MM/yyyy"}
                    />
                </div>
            ))}
        </div>
    );
};

export default DatesFilter;
