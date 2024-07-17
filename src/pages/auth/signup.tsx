import axios, { type AxiosError } from "axios";
import LinkToPolicies from "modules/auth/components/policies";
import { type NextPage } from "next";
import type { CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import { useState, type FormEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUIState, setIsLoading } from "store/slices/ui/slice";

const SignupPage: NextPage = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(selectUIState);

    const [email, setEmail] = useState("");
    const [userAlreadyExists, setUserAlreadyExists] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerification, setPasswordVerification] = useState("");

    const handleSubmitSignUp: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setUserAlreadyExists(false);
        dispatch(setIsLoading(true));
        void axios
            .post("/api/auth/signup", {
                email,
                name,
                description,
                phoneNumber: phoneNumber || undefined,
                password,
            })
            .then((response) => {
                if (response.status !== 200) {
                    return;
                }
                console.log("Need to sign in ...");
                void signIn("credentials", {
                    email,
                    password,
                    callbackUrl: "/",
                });
            })
            .catch((error) => {
                if ((error as AxiosError).response?.status === 400) {
                    setUserAlreadyExists(true);
                }
            })
            .finally(() => {
                dispatch(setIsLoading(false));
            });
    };

    const isEmailValid = email !== "" && email.match(/.+@.+\..+/) !== null;
    const isNameValid = name !== "" && name.length >= 2;
    const isDescriptionValid = description && description !== "";
    const isPhoneNumberValid = phoneNumber === "" || phoneNumber.length >= 10;
    const isPasswordValid = password !== "" && password.length >= 6;
    const arePasswordsMatching = password === passwordVerification;

    const isFormSubmittable =
        isEmailValid &&
        isNameValid &&
        isDescriptionValid &&
        isPhoneNumberValid &&
        isPasswordValid &&
        arePasswordsMatching;

    return (
        <section className="h-full bg-background text-primary ">
            <div className="flex flex-col items-center justify-center gap-6 px-6 py-2">
                <div className="w-full rounded-lg bg-gray-50 shadow dark:border  sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className=" flex justify-center text-xl font-bold leading-tight tracking-tight md:text-2xl">
                            {"Créer un compte"}
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmitSignUp}
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
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />
                                {!isEmailValid && email !== "" && (
                                    <p className="text-sm text-red-500">
                                        {
                                            "L'email est invalide. Veuillez entrer une adresse email valide."
                                        }
                                    </p>
                                )}
                                {userAlreadyExists && (
                                    <p className="text-sm text-red-500">
                                        {
                                            "L'utilisateur existe déjà. Veuillez vous connecter ou utiliser une autre adresse email."
                                        }
                                    </p>
                                )}
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
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                />
                                {!isNameValid && name !== "" && (
                                    <p className="text-sm text-red-500">
                                        {
                                            "Le nom d'utilisateur est invalide. Il doit contenir au moins 2 caractères."
                                        }
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    {"Je suis"}
                                </label>
                                <select
                                    id="description"
                                    name="description"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(event.target.value)
                                    }
                                >
                                    <option value="">
                                        Choisissez une option
                                    </option>
                                    <option value="OWNER">Titulaire</option>
                                    <option value="REPLACER">Remplaçant</option>
                                    <option value="STUDENT">En étude</option>
                                    <option value="OTHER">Autre</option>
                                </select>
                                {!isDescriptionValid && description !== "" && (
                                    <p className="text-sm text-red-500">
                                        {"Veuillez choisir une option."}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="phoneNumber"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    {"Numéro de téléphone (optionnel)"}
                                </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    placeholder="0607080910"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(event) =>
                                        setPhoneNumber(event.target.value)
                                    }
                                />
                                {!isPhoneNumberValid && phoneNumber !== "" && (
                                    <p className="text-sm text-red-500">
                                        {
                                            "Veuillez saisir un numéro de téléphone valide."
                                        }
                                    </p>
                                )}
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
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    className="dark:border-gray block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                />
                                {!isPasswordValid && password !== "" && (
                                    <p className="text-sm text-red-500">
                                        {
                                            "Le mot de passe est invalide. Il doit contenir au moins 6 caractères."
                                        }
                                    </p>
                                )}
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
                                    value={passwordVerification}
                                    onChange={(event) =>
                                        setPasswordVerification(
                                            event.target.value
                                        )
                                    }
                                    className="dark:border-gray block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                />
                                {!arePasswordsMatching &&
                                    passwordVerification !== "" && (
                                        <p className="text-sm text-red-500">
                                            {
                                                "Les mots de passe ne correspondent pas."
                                            }
                                        </p>
                                    )}
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-cta px-5 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary disabled:bg-gray-400"
                                disabled={!isFormSubmittable || isLoading}
                            >
                                {"Créer mon compte"}
                            </button>
                        </form>
                    </div>
                </div>
                <LinkToPolicies />
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
