import { type ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";

type GoogleProviderButtonProps = {
    provider: ClientSafeProvider;
};

const GoogleProviderComponent = ({ provider }: GoogleProviderButtonProps) => {
    return (
        <div
            className="flex items-center justify-center gap-4 hover:cursor-pointer"
            onClick={() => void signIn(provider.id, { callbackUrl: "/" })}
        >
            <Image
                alt="Google"
                loading="lazy"
                height="24"
                width="24"
                id="google-logo"
                src="https://authjs.dev/img/providers/google.svg"
            />
            <button>{"Se connecter avec Google"}</button>
        </div>
    );
};

export default GoogleProviderComponent;
