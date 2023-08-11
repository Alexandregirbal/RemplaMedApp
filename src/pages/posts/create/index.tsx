"use client";
import dayjs from "dayjs";
import { Spinner } from "flowbite-react";
import { getGeocodeDataFromPostalCode } from "modules/geocode";
import type { GeocodeData } from "modules/geocode/types";
import useDebounce from "modules/utils/hooks/useDebounce";
import { useRouter } from "next/router";
import { useEffect, useState, type FormEventHandler } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { selectPostsState, setNewPost } from "store/slices/posts/slice";

const CreatePost = () => {
    const { newPost } = useSelector(selectPostsState);
    const dispatch = useDispatch();
    const debouncedPostalCode = useDebounce(newPost.postalCode, 350);

    const [isPostalCodeLoading, setIsPostalCodeLoading] = useState(false);
    const [isPostalCodeValid, setIsPostalCodeValid] = useState(true);
    const [citiesGeocodes, setCitiesGeocodes] = useState<GeocodeData[]>([]);

    const { push } = useRouter();

    const handleSubmitCreatePostForm: FormEventHandler<HTMLFormElement> = (
        event
    ) => {
        event.preventDefault();
        void push("/posts/create/preview");
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setNewPost({ ...newPost, title: event.target.value }));
    };

    const handleMessageChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        dispatch(setNewPost({ ...newPost, message: event.target.value }));
    };

    const handlePostalCodeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const postalCode = event.target.value;
        dispatch(setNewPost({ ...newPost, postalCode }));
    };

    useEffect(() => {
        if (!debouncedPostalCode) return;
        setIsPostalCodeLoading(true);
        getGeocodeDataFromPostalCode(debouncedPostalCode)
            .then((response) => {
                setIsPostalCodeValid(response.length > 0);
                setCitiesGeocodes(response);
            })
            .catch(() => {
                setIsPostalCodeValid(false);
            })
            .finally(() => {
                setIsPostalCodeLoading(false);
            });
    }, [debouncedPostalCode]);

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const cityGeocode = citiesGeocodes.find(
            (g) => event.target.value === g.city
        );
        dispatch(setNewPost({ ...newPost, ...cityGeocode }));
    };

    const handleFromChange = (date: Date | null) => {
        dispatch(
            setNewPost({
                ...newPost,
                availablityFrom: date
                    ? date?.toISOString()
                    : dayjs().toISOString(),
            })
        );
    };

    const handleToChange = (date: Date | null) => {
        dispatch(
            setNewPost({
                ...newPost,
                availablityTo: date?.toISOString(),
            })
        );
    };

    const isSubmitable =
        isPostalCodeValid &&
        !isPostalCodeLoading &&
        newPost.title &&
        newPost.message &&
        newPost.postalCode &&
        newPost.city;

    return (
        <form
            onSubmit={handleSubmitCreatePostForm}
            className="row md:px-30 flex h-full grow flex-col gap-6 px-8 pb-4 text-lg sm:px-20 lg:px-40 xl:px-52 2xl:px-60"
        >
            <div>
                <label htmlFor="title" className="mb-2 block ">
                    Titre
                </label>
                <input
                    type="text"
                    id="title"
                    value={newPost.title}
                    onChange={handleTitleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Cherche remplacement sur Montpellier en Juin"
                    required
                />
            </div>
            <div className="flex grow flex-col">
                <label htmlFor="message" className="mb-2 block ">
                    Message
                </label>
                <textarea
                    id="message"
                    value={newPost.message}
                    placeholder={`Bonjour,
Cabinet infirmier situé sur la Montpellier cherche un(e) infirmier(ère) pour effectuer des remplacements réguliers, environ 8 jours par mois à partir de Juin...`}
                    onChange={handleMessageChange}
                    className="h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-lg focus:border-blue-500 focus:ring-blue-500 "
                    required
                />
            </div>
            <div>
                <label htmlFor="postalCode" className="mb-2 block ">
                    Code postal
                </label>
                <div
                    id="postalCode-container"
                    className="flex flex-row items-center gap-2 xl:gap-4 2xl:gap-6"
                >
                    <input
                        type="text"
                        id="postalCode"
                        placeholder="34000"
                        value={newPost.postalCode}
                        onChange={handlePostalCodeChange}
                        className={`block rounded-lg border border-gray-300 bg-gray-50 p-2.5 ${
                            isPostalCodeValid
                                ? "focus:border-blue-500 focus:ring-blue-500"
                                : "border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500"
                        }`}
                        required
                    />
                    {isPostalCodeLoading && (
                        <>
                            <Spinner
                                aria-label={"Loading spinner"}
                                color="gray"
                                size="sm"
                            />
                            <div
                                role="status"
                                className="flex animate-pulse align-middle"
                            >
                                <div className="h-4 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                        </>
                    )}
                    {citiesGeocodes.length !== 0 && (
                        <select
                            name="city"
                            id="cities"
                            className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            value={newPost.city ?? ""}
                            onChange={handleCityChange}
                        >
                            <option value=""></option>
                            {citiesGeocodes.map((geocode) => (
                                <option
                                    key={geocode.city}
                                    value={geocode.city}
                                    className="text-primary"
                                >
                                    {geocode.city}
                                </option>
                            ))}
                        </select>
                        // <span>{cities.join(", ")}</span>
                    )}
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="mb-6">
                    <label htmlFor="from" className="mb-2 block ">
                        A partir du
                    </label>
                    <DatePicker
                        className="block w-24 rounded-lg border border-gray-300 bg-gray-50 p-2 text-center focus:border-cta focus:ring-cta"
                        selected={dayjs(newPost.availablityFrom).toDate()}
                        onChange={handleFromChange}
                        dateFormat={"dd/MM/yyyy"}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="to" className="mb-2 block ">
                        {"Jusqu'au"}
                    </label>

                    <DatePicker
                        className="block w-24 rounded-lg border border-gray-300 bg-gray-50 p-2 text-center focus:border-cta focus:ring-cta"
                        selected={
                            newPost.availablityTo
                                ? dayjs(newPost.availablityTo).toDate()
                                : null
                        }
                        onChange={handleToChange}
                        dateFormat={"dd/MM/yyyy"}
                    />
                </div>
            </div>
            <div className="flex justify-evenly gap-8">
                <button
                    type="reset"
                    className="w-full rounded-lg bg-red-900 px-5 py-2.5 text-center text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 sm:w-auto"
                >
                    Annuler
                </button>
                <button
                    disabled={!isSubmitable}
                    type="submit"
                    className="w-full rounded-lg bg-cta px-5 py-2.5 text-center text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 sm:w-auto"
                >
                    Suivant
                </button>
            </div>
        </form>
    );
};

export default CreatePost;
