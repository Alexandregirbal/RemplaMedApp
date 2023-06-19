import { type NextPage } from "next";
import type { CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken, getProviders } from "next-auth/react";

const SignupPage: NextPage = () => {
    return (
        <section className="h-full bg-background text-primary ">
            <div className="flex h-full flex-col items-center justify-center px-6">
                <p className="mb-6 flex items-center text-3xl font-semibold ">
                    RemplaMed
                </p>
                <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className=" flex justify-center text-xl font-bold leading-tight tracking-tight md:text-2xl">
                            Créer un compte
                        </h1>
                        <form>hello je suis le form</form>
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
