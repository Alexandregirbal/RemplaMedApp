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

    return (
        <>
            <h1>Page de paiement</h1>
            <div>Merci de régler 5.90 € pour publier votre poste.</div>
            <div>{`Vous serez redirigé vers la page de paiement en cliquant sur le bouton "Payer"`}</div>
            <div className="flex justify-center">
                <button
                    className="rounded-lg bg-cta px-5 py-2.5 text-center text-white"
                    onClick={handlePayment}
                >
                    Payer
                </button>
            </div>
        </>
    );
};

export default Payment;
