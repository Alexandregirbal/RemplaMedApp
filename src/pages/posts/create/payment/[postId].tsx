import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setIsLoading } from "store/slices/ui/slice";

const Payment = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { postId } = router.query;

    if (!postId || Array.isArray(postId)) {
        return (
            <>
                <h1>Erreur lors de la redirection vers la page de paiement</h1>
                <div>Un identifiant de post valide est nécessaire</div>
            </>
        );
    }

    const handlePayment = () => {
        console.log("Payment");
        dispatch(setIsLoading(true));
        axios
            .get(`/api/payment?product=post&postId=${postId}`)
            .then((result) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                const paymentUrl = result.data.paymentUrl as string;
                void router.push(paymentUrl);
            })
            .finally(() => {
                dispatch(setIsLoading(false));
            });
    };

    const handlePreviousClick = () => {
        void router.back();
    };

    return (
        <div className="flex h-full flex-col gap-4 px-4">
            <div className="flex h-5/6 flex-col gap-2 pt-4">
                <h1 className="text-center text-2xl font-bold">
                    Page de paiement
                </h1>
                <div>Merci de régler 5.90 € pour publier votre poste.</div>
                <div>{`Vous serez redirigé vers la page de paiement en cliquant sur le bouton "Payer"`}</div>
            </div>
            <div className="flex justify-evenly gap-8">
                <button
                    onClick={handlePreviousClick}
                    className="w-full rounded-lg bg-red-900 px-5 py-2.5 text-center text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 sm:w-auto"
                >
                    Retour
                </button>

                <button
                    className="w-full rounded-lg bg-cta px-5 py-2.5 text-center text-white"
                    onClick={handlePayment}
                >
                    Payer
                </button>
            </div>
        </div>
    );
};

export default Payment;
