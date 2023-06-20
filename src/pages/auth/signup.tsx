import { type NextPage } from "next";
import type { CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken, getProviders } from "next-auth/react";

const SignupPage: NextPage = () => {
    return (
        <section className="h-full bg-background text-primary ">
            <div className="flex h-full flex-col items-center justify-center px-6">
                <p className="mb-6 flex items-center text-3xl font-semibold ">
                    {"RemplaMed"}
                </p>
                <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className=" flex justify-center text-xl font-bold leading-tight tracking-tight md:text-2xl">
                            {"Créer un compte"}
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            method="post"
                            action="/api/auth/signup"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block  font-medium "
                                >
                                    {"Email"}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="dark:border-gray block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                    placeholder="amelie.durand@gmail.com"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-1 block font-medium "
                                >
                                    {"Nom d'utilisateur"}
                                </label>
                                <p className="text-sm text-gray-600">
                                    {
                                        "Le choix est libre, vous pouvez choisir votre nom complet, votre prénom, ou bien un pseudo (ex: Amelie Durand, Amelie ...)"
                                    }
                                </p>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="dark:border-gray block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                    placeholder="Amelie Durand"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="userTitle"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    {"Je suis"}
                                </label>
                                <select
                                    id="userTitle"
                                    name="userTitle"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option selected>
                                        Choisissez une option
                                    </option>
                                    <option value="OWNER">Titulaire</option>
                                    <option value="REPLACER">Remplaçant</option>
                                    <option value="STUDENT">En étude</option>
                                    <option value="OTHER">Autre</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block font-medium "
                                >
                                    {"Mot de passe"}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    min={6}
                                    id="password"
                                    placeholder="••••••••"
                                    className="dark:border-gray block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password-verification"
                                    className="mb-2 block font-medium "
                                >
                                    {"Vérification du mot de passe"}
                                </label>
                                <input
                                    type="password"
                                    name="password-verification"
                                    min={6}
                                    id="password-verification"
                                    placeholder="••••••••"
                                    className="dark:border-gray block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-cta px-5 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary"
                            >
                                {"Créer mon compte"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignupPage;

export async function getServerSideProps(context: CtxOrReq) {
    const providers = await getProviders();
    const csrfToken = await getCsrfToken(context);
    return {
        props: {
            providers,
            csrfToken,
        },
    };
}
