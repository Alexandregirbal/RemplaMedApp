"use client";

import type { CheckedState } from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Spinner } from "flowbite-react";
import { getGeocodeDataFromPostalCode } from "modules/geocode";
import type { GeocodeData } from "modules/geocode/types";
import { getPostIntentLabel } from "modules/post/services/postIntentLabels";
import useDebounce from "modules/utils/hooks/useDebounce";
import { EMAIL_REGEX, PHONE_REGEX } from "modules/utils/regex";
import { useRouter } from "next/router";
import { useEffect, useRef, useState, type FormEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostIntent, isPostIntent } from "server/database/models/post/types";
import { Button } from "shadcn/components/ui/button";
import { Checkbox } from "shadcn/components/ui/checkbox";
import { DatePicker } from "shadcn/components/ui/datePicker";
import {
    resetNewPost,
    selectPostsState,
    setNewPost,
} from "store/slices/posts/slice";
import { selectUserState } from "store/slices/user/slice";

// TODO: check qu'il y a un email ou un numéro de téléphone dans le message sinon on ne publie pas

const CreatePost = () => {
    const { newPost } = useSelector(selectPostsState);
    const user = useSelector(selectUserState);

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

    const handleUseEmailChange = (event: CheckedState) => {
        if (!user.email) return;

        const useEmail = Boolean(event.valueOf());
        const currentMessage = newPost.message;
        if (useEmail) {
            const isEmailInMessage = currentMessage.match(EMAIL_REGEX);
            if (isEmailInMessage) return;

            const newMessage = currentMessage.concat(`\nEmail: ${user.email}`);
            dispatch(setNewPost({ ...newPost, message: newMessage }));
        } else {
            const newMessage = currentMessage.replace(/\nEmail: .*/g, "");
            dispatch(setNewPost({ ...newPost, message: newMessage }));
        }
    };

    const handleUsePhoneChange = (event: CheckedState) => {
        if (!user.phoneNumber) return;
        const usePhone = Boolean(event.valueOf());
        const currentMessage = newPost.message;
        if (usePhone) {
            const isPhoneInMessage = currentMessage.match(PHONE_REGEX);
            if (isPhoneInMessage) return;

            const newMessage = currentMessage.concat(
                `\nTéléphone: ${user.phoneNumber}`
            );
            dispatch(setNewPost({ ...newPost, message: newMessage }));
        } else {
            const newMessage = currentMessage.replace(/\nTéléphone: .*/g, "");
            dispatch(setNewPost({ ...newPost, message: newMessage }));
        }
    };

    const handlePostalCodeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const postalCode = event.target.value;
        dispatch(setNewPost({ ...newPost, postalCode }));
    };

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

    const messageConainsContactInfo =
        newPost.message.match(EMAIL_REGEX) ||
        newPost.message.match(PHONE_REGEX);

    const isSubmitable =
        isPostalCodeValid &&
        !isPostalCodeLoading &&
        newPost.intent &&
        newPost.message &&
        newPost.postalCode &&
        newPost.city &&
        messageConainsContactInfo;

    return (
        <>
            <h1 className="text-center text-xl">Créez votre post</h1>
            <form
                onSubmit={handleSubmitCreatePostForm}
                onReset={handleResetCreatePostForm}
                className="row md:px-30 flex h-full grow flex-col gap-2 overflow-x-hidden px-4 py-2 text-sm sm:px-20 lg:px-40 xl:px-52 2xl:px-60"
            >
                <div>
                    <label htmlFor="postIntent" className=" block text-lg ">
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
                    <label htmlFor="message" className=" block text-lg">
                        Message
                    </label>
                    <textarea
                        id="message"
                        ref={messageRef}
                        value={newPost.message}
                        placeholder={`Bonjour,
Cabinet infirmier situé sur Montpellier cherche un(e) infirmier(ère) pour effectuer des remplacements réguliers, environ 10 jours par mois à partir de Juin...`}
                        onChange={handleMessageChange}
                        className={`text-s h-full w-full rounded-lg border border-gray-300  p-1.5 ${
                            !newPost.message || messageConainsContactInfo
                                ? "focus:border-cta focus:ring-cta"
                                : "border-tertiary ring-tertiary focus:border-tertiary focus:ring-tertiary"
                        }`}
                        required
                    />
                    {newPost.message && !messageConainsContactInfo && (
                        <p className="mt-1 px-2 text-xs text-tertiary">
                            {
                                "Votre post doit contenir des informations de contact (email ou téléphone)."
                            }
                        </p>
                    )}
                </div>

                {user.email && (
                    <div>
                        <div className="flex gap-2 leading-none">
                            <Checkbox
                                id="addEmail"
                                className="data-[state=unchecked]:border-cta"
                                value={Number(newPost.contact.useEmail)}
                                onCheckedChange={handleUseEmailChange}
                            />
                            <label
                                htmlFor="addEmail"
                                className="text-sm  leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Ajouter mon adresse email à la fin du post
                            </label>
                        </div>
                    </div>
                )}
                {user.phoneNumber && (
                    <div>
                        <div className="flex gap-2 leading-none">
                            <Checkbox
                                id="addPhone"
                                className="data-[state=unchecked]:border-cta"
                                value={Number(newPost.contact.usePhone)}
                                onCheckedChange={handleUsePhoneChange}
                            />
                            <label
                                htmlFor="addPhone"
                                className="text-sm  leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Ajouter mon numéro de téléphone à la fin du post
                            </label>
                        </div>
                    </div>
                )}
                <div>
                    <label htmlFor="postalCode" className="block text-lg">
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
                                    : "border-tertiary ring-tertiary focus:border-tertiary focus:ring-tertiary"
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
                <div className="mb-6 flex items-start gap-4">
                    <div className=" w-1/2">
                        <label htmlFor="from" className="block text-lg">
                            A partir du
                        </label>
                        <DatePicker
                            selected={dayjs(newPost.availablityFrom).toDate()}
                            onChange={handleFromChange}
                        />
                    </div>
                    <div className=" w-1/2">
                        <label htmlFor="to" className="block text-lg">
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
                    <Button
                        type="reset"
                        variant={"destructive"}
                        className="w-full text-base sm:w-auto"
                    >
                        Annuler
                    </Button>
                    <Button
                        disabled={!isSubmitable}
                        type="submit"
                        variant={"default"}
                        className="w-full text-base sm:w-auto"
                    >
                        Suivant
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CreatePost;
