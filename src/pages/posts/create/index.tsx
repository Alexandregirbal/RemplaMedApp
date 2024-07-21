"use client";

import dayjs from "dayjs";
import { Spinner } from "flowbite-react";
import { getGeocodeDataFromPostalCode } from "modules/geocode";
import type { GeocodeData } from "modules/geocode/types";
import { getPostIntentLabel } from "modules/post/services/postIntentLabels";
import useDebounce from "modules/utils/hooks/useDebounce";
import { useRouter } from "next/router";
import { useEffect, useRef, useState, type FormEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostIntent, isPostIntent } from "server/database/models/post/types";
import { DatePicker } from "shadcn/components/ui/datePicker";
import {
    resetNewPost,
    selectPostsState,
    setNewPost,
} from "store/slices/posts/slice";

const CreatePost = () => {
    const { newPost } = useSelector(selectPostsState);
    const dispatch = useDispatch();
    const debouncedPostalCode = useDebounce(newPost.postalCode, 350);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const [isPostalCodeLoading, setIsPostalCodeLoading] = useState(false);
    const [isPostalCodeValid, setIsPostalCodeValid] = useState(true);
    const [citiesGeocodes, setCitiesGeocodes] = useState<GeocodeData[]>([]);

    const { push, back } = useRouter();

    const handleSubmitCreatePostForm: FormEventHandler<HTMLFormElement> = (
        event
    ) => {
        event.preventDefault();
        void push("/posts/create/preview");
    };

    const handleResetCreatePostForm: FormEventHandler<HTMLFormElement> = (
        event
    ) => {
        event.preventDefault();
        dispatch(resetNewPost());
        setCitiesGeocodes([]);
        back();
    };

    const handlePostIntentChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newIntent = event.target.value;
        if (!isPostIntent(newIntent)) return;

        dispatch(setNewPost({ ...newPost, intent: newIntent }));
        messageRef.current?.focus();
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
        if (!debouncedPostalCode || debouncedPostalCode.length !== 5) return;
        setIsPostalCodeLoading(true);
        getGeocodeDataFromPostalCode(debouncedPostalCode)
            .then((response) => {
                setIsPostalCodeValid(response.length > 0);
                setCitiesGeocodes(response);
                dispatch(setNewPost({ ...newPost, ...response[0] }));
            })
            .catch(() => {
                setIsPostalCodeValid(false);
            })
            .finally(() => {
                setIsPostalCodeLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedPostalCode]);

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const cityGeocode = citiesGeocodes.find(
            (g) => event.target.value === g.city
        );
        dispatch(setNewPost({ ...newPost, ...cityGeocode }));
    };

    const handleFromChange = (date?: Date | null) => {
        dispatch(
            setNewPost({
                ...newPost,
                availablityFrom: date
                    ? date?.toISOString()
                    : dayjs().toISOString(),
            })
        );
    };

    const handleToChange = (date?: Date | null) => {
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
        newPost.intent &&
        newPost.message &&
        newPost.postalCode &&
        newPost.city;

    return (
        <form
            onSubmit={handleSubmitCreatePostForm}
            onReset={handleResetCreatePostForm}
            className="row md:px-30 flex h-full grow flex-col gap-2 overflow-x-hidden p-6 text-sm sm:px-20 lg:px-40 xl:px-52 2xl:px-60"
        >
            <div>
                <label htmlFor="postIntent" className="mb-2 block text-lg ">
                    Intention de post
                </label>
                <select
                    name="intent"
                    id="postIntent"
                    className="block w-full rounded-lg border border-gray-300  p-1.5 focus:border-cta focus:ring-cta"
                    onChange={handlePostIntentChange}
                >
                    {Object.values(PostIntent).map((intent) => (
                        <option key={intent} value={intent}>
                            {getPostIntentLabel(intent)}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex grow flex-col">
                <label htmlFor="message" className="mb-2 block text-lg">
                    Message
                </label>
                <textarea
                    id="message"
                    ref={messageRef}
                    value={newPost.message}
                    placeholder={`Bonjour,
Cabinet infirmier situé sur la Montpellier cherche un(e) infirmier(ère) pour effectuer des remplacements réguliers, environ 8 jours par mois à partir de Juin...`}
                    onChange={handleMessageChange}
                    className="text-s h-full w-full rounded-lg border border-gray-300  p-1.5 focus:border-cta focus:ring-cta"
                    required
                />
            </div>
            <div>
                <label htmlFor="postalCode" className="mb-2 block text-lg">
                    Code postal
                </label>
                <div
                    id="postalCode-container"
                    className=" flex w-full flex-row items-center gap-2 xl:gap-4 2xl:gap-6"
                >
                    <input
                        type="number"
                        id="postalCode"
                        placeholder="34000"
                        value={newPost.postalCode}
                        onChange={handlePostalCodeChange}
                        className={`block w-1/3 min-w-[8rem] rounded-lg border border-gray-300  p-1.5 ${
                            isPostalCodeValid
                                ? "focus:border-cta focus:ring-cta"
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
                            className="block rounded-lg border border-gray-300 p-1.5 text-gray-900 focus:border-cta focus:ring-cta "
                            value={newPost.city ?? ""}
                            onChange={handleCityChange}
                        >
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
                <div className="mb-6 w-1/2">
                    <label htmlFor="from" className="mb-2 block text-lg">
                        A partir du
                    </label>
                    <DatePicker
                        selected={dayjs(newPost.availablityFrom).toDate()}
                        onChange={handleFromChange}
                    />
                </div>
                <div className="mb-6 w-1/2">
                    <label htmlFor="to" className="mb-2 block text-lg">
                        {"Jusqu'au"}
                    </label>

                    <DatePicker
                        selected={
                            newPost.availablityTo
                                ? dayjs(newPost.availablityTo).toDate()
                                : undefined
                        }
                        onChange={handleToChange}
                        minDate={dayjs(newPost.availablityFrom).toDate()}
                    />
                </div>
            </div>
            <div className="flex justify-evenly gap-8 text-center text-white">
                <button
                    type="reset"
                    className="w-full rounded-lg bg-tertiary px-5 py-2.5 text-base hover:bg-tertiary focus:outline-none focus:ring-4 focus:ring-red-300 sm:w-auto"
                >
                    Annuler
                </button>
                <button
                    disabled={!isSubmitable}
                    type="submit"
                    className="w-full rounded-lg bg-cta px-5 py-2.5 text-base  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 sm:w-auto"
                >
                    Suivant
                </button>
            </div>
        </form>
    );
};

export default CreatePost;
