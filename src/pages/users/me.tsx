import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLoading } from "store/slices/ui/slice";

const UserMePage = () => {
    const session = useSession();
    const dispatch = useDispatch();

    const [name, setName] = useState<string>("");

    const isSubmitable = session.data?.user?.name !== name && name !== "";

    useEffect(() => {
        if (session.status !== "authenticated") return;
        if (session.data?.user.name) {
            setName(session.data?.user.name);
        }
    }, [session]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setIsLoading(false));
        void axios
            .put("/api/users/profile", {
                name,
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
                        className="w-1/2 rounded-md border border-gray-300 p-1 text-gray-500"
                    />
                </div>
                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="name">{"Nom d'utilisateur"}</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-1/2 rounded-md border border-gray-300 p-1"
                    />
                </div>

                {isSubmitable && (
                    <div className="flex justify-center">
                        <button
                            role="submit"
                            className="w-52 rounded-lg bg-cta px-5 py-2 text-center font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary "
                        >
                            Modifier
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default UserMePage;
