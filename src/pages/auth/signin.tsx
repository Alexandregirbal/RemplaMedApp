import EmailProviderComponent from "modules/auth/components/providers/EmailProviderComponent";
import GoogleProviderComponent from "modules/auth/components/providers/GoogleProviderComponent";
import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, getProviders } from "next-auth/react";
import Link from "next/link";

const SigninPage = ({
    providers,
    csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (!providers) return null;
    return (
        <section className="h-full bg-background text-primary ">
            <div className="flex h-full flex-col items-center justify-center px-6">
                <p className="mb-6 flex items-center text-3xl font-semibold ">
                    RemplaMed
                </p>
                <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className=" flex justify-center text-xl font-bold leading-tight tracking-tight md:text-2xl">
                            Connectez-vous à votre compte
                        </h1>

                        {providers["google"] && (
                            <GoogleProviderComponent
                                provider={providers["google"]}
                            />
                        )}

                        <hr />

                        {providers["credentials_provider"] && (
                            <EmailProviderComponent csrfToken={csrfToken} />
                        )}

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            {"Vous n'avez pas de compte ?"}{" "}
                            <Link
                                href="/auth/signup"
                                className="dark:text-primary-500 font-medium text-primary hover:underline"
                            >
                                {"Créer un compte"}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SigninPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const providers = await getProviders();
    const csrfToken = await getCsrfToken(context);

    return {
        props: {
            providers,
            csrfToken,
        },
    };
}
