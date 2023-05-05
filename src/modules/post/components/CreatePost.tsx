import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
    const [postForm, setPostForm] = useState({
        isPublished: true,
        title: "",
        message: "",
        postalCode: "",
        from: "",
        to: "",
    });

    const handleSubmitCreatePostForm = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const result = await axios.post("/api/posts/create", postForm);
        console.log(result);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostForm({ ...postForm, title: event.target.value });
    };

    const handleMessageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPostForm({ ...postForm, message: event.target.value });
    };

    const handlePostalCodeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPostForm({ ...postForm, postalCode: event.target.value });
    };

    const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostForm({ ...postForm, from: event.target.value });
    };

    const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostForm({ ...postForm, to: event.target.value });
    };

    const handleIsPublishedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isPublished = event.target.value === "true";
        setPostForm({ ...postForm, isPublished });
    };

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={handleSubmitCreatePostForm}>
            <div className="mb-6">
                <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                    Titre
                </label>
                <input
                    type="title"
                    id="title"
                    value={postForm.title}
                    onChange={handleTitleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Cherche remplacement du 12 au 15 juin"
                    required
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                    Message
                </label>
                <input
                    type="text"
                    id="message"
                    value={postForm.message}
                    onChange={handleMessageChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="postalCode"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                    Code postal
                </label>
                <input
                    type="text"
                    id="postalCode"
                    value={postForm.postalCode}
                    onChange={handlePostalCodeChange}
                    className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-6 flex items-start gap-4">
                <div className="mb-6">
                    <label
                        htmlFor="from"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        A partir du
                    </label>
                    <input
                        type="date"
                        id="from"
                        value={postForm.from}
                        onChange={handleFromChange}
                        className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="to"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {"Jusqu'au"}
                    </label>
                    <input
                        type="date"
                        id="to"
                        value={postForm.to}
                        onChange={handleToChange}
                        className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="mb-6 flex items-start">
                <div className="flex h-5 items-center">
                    <input
                        id="publishNow"
                        type="checkbox"
                        defaultChecked={postForm.isPublished}
                        onChange={handleIsPublishedChange}
                        className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    />
                </div>
                <label
                    htmlFor="publishNow"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Publier immédiatement
                </label>
            </div>
            <button
                type="submit"
                className="w-full rounded-lg bg-button px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            >
                Suivant
            </button>
            <button
                type="reset"
                className="w-full rounded-lg bg-red-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 sm:w-auto"
            >
                Annuler
            </button>
        </form>
    );
};

export default CreatePost;
