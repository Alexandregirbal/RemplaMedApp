import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { DatePicker } from "shadcn/components/ui/datePicker";
import { selectFiltersState } from "store/slices/filters/slice";
import type { FiltersState } from "store/slices/filters/types";
import { selectPostsState } from "store/slices/posts/slice";
import { useFilters } from "../hooks/useFilters";
import { filterByDateFromDateTo } from "../services/filterByDateFromDateTo";

const DatesFilter = () => {
    const {
        dates: { from, to },
    } = useSelector(selectFiltersState);
    const { data } = useSelector(selectPostsState);
    const { upsertFilter } = useFilters();

    const handleDateFilterChange = (
        newDatesFilter: Omit<FiltersState["dates"], "postsIds">
    ) => {
        const newPosts = filterByDateFromDateTo({
            posts: data,
            datesFilter: newDatesFilter,
        });
        const filteredPostsIds = newPosts.map((post) => post._id);
        upsertFilter({
            name: "dates",
            value: newDatesFilter,
        });
        return filteredPostsIds;
    };

    const handleDateFromChange = (date?: Date | null) => {
        const newDates = {
            from: date ? dayjs(date).format("YYYY-MM-DD") : null,
            to,
        };
        handleDateFilterChange(newDates);
    };

    const handleDateToChange = (date?: Date | null) => {
        const newDates = {
            from,
            to: date ? dayjs(date).format("YYYY-MM-DD") : null,
        };
        handleDateFilterChange(newDates);
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
            label: "Disponible jusqu'au",
        },
    ];

    return (
        <div className="flex flex-col gap-4 whitespace-nowrap">
            {dateObjects.map(({ key, date, min, handleDateChange, label }) => (
                <div
                    key={key}
                    className="flex cursor-pointer items-center gap-2"
                >
                    <label className="w-1/2 whitespace-normal">{label}</label>
                    <div className="w-1/2" onClick={(e) => e.stopPropagation()}>
                        <DatePicker
                            selected={date ? dayjs(date).toDate() : undefined}
                            minDate={min ? dayjs(min).toDate() : undefined}
                            onChange={handleDateChange}
                            className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-center focus:border-cta focus:ring-cta"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DatesFilter;
