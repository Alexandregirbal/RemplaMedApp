type CredentialsProviderComponentProps = {
    csrfToken?: string;
};

const CredentialsProviderComponent = ({
    csrfToken,
}: CredentialsProviderComponentProps) => {
    return (
        <form
            className="space-y-4 md:space-y-6"
            method="post"
            action="/api/auth/callback/credentials"
        >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium "
                >
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="dark:border-gray block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="example@gmail.com"
                />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium "
                >
                    Mot de passe
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="dark:border-gray block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
            </div>
            {/* <div className="flex items-center justify-between">
                <a
                    href="#"
                    className="dark:text-primary-500 text-sm font-medium text-primary hover:underline"
                >
                    Mot de passe oublié?
                </a>
            </div> */}
            <button
                type="submit"
                className="w-full rounded-lg bg-cta px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary"
            >
                Connexion
            </button>
        </form>
    );
};

export default CredentialsProviderComponent;
