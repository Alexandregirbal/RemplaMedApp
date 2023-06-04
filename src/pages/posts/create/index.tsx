"use client";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { type FormEventHandler } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
    resetNewPost,
    selectPostsState,
    setNewPost,
} from "store/slices/posts/slice";

const CreatePost = () => {
    const { newPost } = useSelector(selectPostsState);
    const dispatch = useDispatch();

    const { push } = useRouter();

    const handleSubmitCreatePostForm: FormEventHandler<HTMLFormElement> = (
        event
    ) => {
        event.preventDefault();
        const func = async () => {
            const result = await axios.post("/api/posts/create", newPost);
            if (result.status !== 200) {
                return alert("Une erreur est survenue");
            }
            dispatch(resetNewPost());
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const newPostId = result.data.postId as string;
            await push(`/posts/${newPostId}`);
        };
        void func();
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
        dispatch(setNewPost({ ...newPost, postalCode: event.target.value }));
    };

    const handleFromChange = (date: Date | null) => {
        dispatch(
            setNewPost({
                ...newPost,
                availablityFrom: date?.toISOString(),
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

    return (
        <form
            onSubmit={handleSubmitCreatePostForm}
            className="row flex h-full grow flex-col px-60 text-lg"
        >
            <div className="mb-6">
                <label htmlFor="title" className="mb-2 block ">
                    Titre
                </label>
                <input
                    type="title"
                    id="title"
                    value={newPost.title}
                    onChange={handleTitleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Cherche remplacement sur Montpellier en Juin"
                    required
                />
            </div>
            <div className="mb-6 flex grow flex-col">
                <label htmlFor="message" className="mb-2 block ">
                    Message
                </label>
                <textarea
                    id="message"
                    value={newPost.message}
                    placeholder={`Bonjour,
Cabinet infirmier situé sur la Montpellier cherche un(e) infirmier(ère) pour effectuer des remplacements réguliers, environ 8 jours par mois à partir de Juin...`}
                    onChange={handleMessageChange}
                    className="h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="postalCode" className="mb-2 block ">
                    Code postal
                </label>
                <input
                    type="text"
                    id="postalCode"
                    placeholder="34000"
                    value={newPost.postalCode}
                    onChange={handlePostalCodeChange}
                    className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-6 flex items-start gap-4">
                <div className="mb-6">
                    <label htmlFor="from" className="mb-2 block ">
                        A partir du
                    </label>
                    <DatePicker
                        className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                        className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
            <div className="flex justify-evenly">
                <button
                    type="reset"
                    className="w-full rounded-lg bg-red-900 px-5 py-2.5 text-center text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 sm:w-auto"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="w-full rounded-lg bg-cta px-5 py-2.5 text-center text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
                >
                    Suivant
                </button>
            </div>
        </form>
    );
};

export default CreatePost;
