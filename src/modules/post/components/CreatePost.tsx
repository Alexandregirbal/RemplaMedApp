"use client";
import type Prisma from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { type FormEventHandler, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CreatePost = () => {
    const [postForm, setPostForm] = useState<Partial<Prisma.Post>>({
        published: true,
        title: "",
        message: "",
        postalCode: "",
        availablityFrom: new Date(),
        availablityTo: null,
    });

    const { push } = useRouter();

    const handleSubmitCreatePostForm: FormEventHandler<HTMLFormElement> = (
        event
    ) => {
        event.preventDefault();
        const func = async () => {
            const result = await axios.post("/api/posts/create", postForm);
            if (result.status !== 200) {
                return alert("Une erreur est survenue");
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const newPostId = result.data.postId as string;
            await push(`/posts/${newPostId}`);
        };
        void func();
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostForm({ ...postForm, title: event.target.value });
    };

    const handleMessageChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setPostForm({ ...postForm, message: event.target.value });
    };

    const handlePostalCodeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPostForm({ ...postForm, postalCode: event.target.value });
    };

    const handleFromChange = (date: Date | null) => {
        setPostForm({
            ...postForm,
            availablityFrom: date,
        });
    };

    const handleToChange = (date: Date | null) => {
        setPostForm({
            ...postForm,
            availablityTo: date,
        });
    };

    const handlePublishedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const published = event.target.value === "true";
        setPostForm({ ...postForm, published });
    };

    return (
        <form
            onSubmit={handleSubmitCreatePostForm}
            className="flex grow flex-col text-lg"
        >
            <div className="mb-6">
                <label htmlFor="title" className="mb-2 block ">
                    Titre
                </label>
                <input
                    type="title"
                    id="title"
                    value={postForm.title}
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
                    value={postForm.message}
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
                    value={postForm.postalCode}
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
                        selected={postForm.availablityFrom}
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
                        selected={postForm.availablityTo}
                        onChange={handleToChange}
                        dateFormat={"dd/MM/yyyy"}
                    />
                </div>
            </div>
            <div className="mb-6 flex items-start">
                <div className="flex h-5 items-center">
                    <input
                        id="publishNow"
                        type="checkbox"
                        defaultChecked={postForm.published}
                        onChange={handlePublishedChange}
                        className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    />
                </div>
                <label htmlFor="publishNow" className="ml-2 dark:text-gray-300">
                    Publier immédiatement
                </label>
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
