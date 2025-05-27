import { PaymentStatus } from "server/database/models/post/types";

export const getPaymentStatusString = (
    paymentStatus?: PaymentStatus | null
) => {
    switch (paymentStatus) {
        case PaymentStatus.paid:
            return "Facture payée";
        case PaymentStatus.open:
            return "Paiement en cours";
        case PaymentStatus.canceled:
            return "Paiement annulé";
        case PaymentStatus.expired:
            return "Paiement expiré";
        case PaymentStatus.failed:
            return "Paiement échoué";
        case PaymentStatus.pending:
            return "Paiement en attente";
        default:
            return "Aucun paiement";
    }
};

export const getPaymentColor = (paymentStatus?: PaymentStatus | null) => {
    switch (paymentStatus) {
        case PaymentStatus.paid:
            return "text-green-500";
        case PaymentStatus.open:
            return "text-yellow-500";
        case PaymentStatus.canceled:
            return "text-red-500";
        case PaymentStatus.expired:
            return "text-red-500";
        case PaymentStatus.failed:
            return "text-red-500";
        case PaymentStatus.pending:
            return "text-yellow-500";
        default:
            return "text-primary";
    }
};
