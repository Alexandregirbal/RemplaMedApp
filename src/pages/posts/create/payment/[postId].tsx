import axios from "axios";
import { useRouter } from "next/router";

const Payment = () => {
    const router = useRouter();
    // get postId from router
    const { postId } = router.query;
    console.log(`~~~~~ LOG by Girbal | Payment | postId: `, postId);

    if (!postId || Array.isArray(postId)) {
        return (
            <>
                <h1>Erreur lors de la redirection vers la page de paiement</h1>
                <div>Un identifiant de post valide est nécessaire</div>
            </>
        );
    }

    const handlePayment = async () => {
        console.log("Payment");
        // TODO: loading state ON
        const result = await axios.get(
            `/api/payment?product=post&id=${postId}`
        );
        // TODO: loading state OFF
        const paymentUrl = result.data as string;
        await router.push(paymentUrl);
        return;
    };

    return (
        <>
            <h1>Page de paiement</h1>
            <div>Merci de régler 5.90 € pour publier votre poste.</div>
            <div>{`Vous serez redirigé vers la page de paiement en cliquant sur le bouton "Payer"`}</div>
            <button onClick={() => void handlePayment()}>Payer</button>
        </>
    );
};

export default Payment;
