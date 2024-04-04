/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { UserDescription } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLoading } from "store/slices/ui/slice";

const UserMePage = () => {
    const session = useSession();
    const dispatch = useDispatch();

    const [name, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        if (session.status !== "authenticated") return;
        dispatch(setIsLoading(true));
        axios
            .get(`/api/users/profile`)
            .then((result) => {
                setName(result.data.data.name ?? "");
                setPhoneNumber(result.data.data.phoneNumber ?? "");
                setDescription(result.data.data.description ?? "");
            })

            .finally(() => {
                dispatch(setIsLoading(false));
            });
    }, [dispatch, session]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setIsLoading(true));
        void axios
            .put("/api/users/profile", {
                name,
                phoneNumber,
                description,
            })
            .then(() => {
                void session.update({ name });
            })
            .finally(() => {
                dispatch(setIsLoading(false));
            });
    };
    if (session.status !== "authenticated") return null;

    const { user } = session.data;
    if (!user) return null;

    return (
        <div
            className={`flex h-full w-full flex-col gap-4 overflow-y-scroll p-2 px-4 sm:px-20 md:px-40 lg:px-60 xl:px-80 2xl:px-96 `}
        >
            <h1 className="text-2xl">Mon profil</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="email">Email</label>
                    <input
                        disabled
                        id="email"
                        type="email"
                        value={user.email ?? ""}
                        className="w-full rounded-md border border-gray-300 p-1 text-gray-500"
                    />
                </div>
                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="name" className="whitespace-nowrap">
                        {"Nom d'utilisateur"}
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-md border border-cta p-1"
                    />
                </div>
                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="phoneNumber" className="whitespace-nowrap">
                        {"Numéro de téléphone"}
                    </label>
                    <input
                        id="phoneNumber"
                        type="tel"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        className="w-full rounded-md border border-cta p-1"
                    />
                </div>
                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="description">{"Situation"}</label>
                    <select
                        id="description"
                        name="description"
                        className="w-full rounded-md border border-cta p-1"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    >
                        <option value="">Choisissez une option</option>
                        <option value={UserDescription.OWNER}>Titulaire</option>
                        <option value={UserDescription.REPLACER}>
                            Remplaçant
                        </option>
                        <option value={UserDescription.STUDENT}>
                            En étude
                        </option>
                        <option value={UserDescription.OTHER}>Autre</option>
                    </select>
                </div>

                <div className="mt-4 flex justify-center ">
                    <button
                        role="submit"
                        className="w-52 rounded-lg bg-cta px-5 py-2 text-center font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary "
                    >
                        {"Modifier"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserMePage;
