import { Button } from '@/Components/ui/button';
import { Admission, Event, Extra, PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import {
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { PaymentFormProps } from '../View';

export const PaymentForm = ({
    totalAmount,
    tickets,
    paymentIntent,
    setProgress,
}: PaymentFormProps) => {
    const { event } = usePage<PageProps<{ event: Event }>>().props;
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setProcessing] = useState(false);
    const [checkOut, setCheckout] = useState(false);

    const handleCheckout = async () => {
        router.post(
            route('payment.save'),
            {
                amount: totalAmount,
                event_id: event.id,
                paymentIntentId: paymentIntent,
                tickets: tickets,
            },
            {
                onSuccess: () => {
                    setCheckout(true);
                    setProgress(75);
                },
                onError: (e) => console.error('Error:', e),
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        setProgress(100);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: route('payment.process'),
            },
        });

        if (error) {
            console.error('Payment error:', error.message);
            setProcessing(false);
        }
    };

    return checkOut ? (
        <PaymentCheckoutForm
            handleSubmit={handleSubmit}
            isProcessing={isProcessing}
        />
    ) : (
        <OrderReview
            tickets={tickets}
            totalAmount={totalAmount}
            isProcessing={isProcessing}
            handleCheckout={handleCheckout}
        />
    );
};

const PaymentCheckoutForm = ({
    handleSubmit,
    isProcessing,
}: {
    handleSubmit: (e: React.FormEvent) => void;
    isProcessing: boolean;
}) => {
    const stripe = useStripe();

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold uppercase tracking-wider leading-none">
                Procéder au paiement
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                <PaymentElement />
                <Button
                    variant={'customer_primary'}
                    className="w-full"
                    disabled={!stripe || isProcessing}
                    type="submit"
                >
                    {isProcessing ? 'Paiement en cours...' : 'Payer'}
                </Button>
            </form>
        </div>
    );
};

const OrderReview = ({
    tickets,
    totalAmount,
    isProcessing,
    handleCheckout,
}: {
    tickets: { admissions: Admission[]; extras: Extra[] };
    totalAmount: number;
    isProcessing: boolean;
    handleCheckout: () => void;
}) => {
    const stripe = useStripe();

    const { auth } = usePage<PageProps>().props;
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold uppercase tracking-wider leading-none">
                    Vérification de la commande
                </h2>
                <p className="text-gray-700 text-sm">
                    Les billets seront envoyés à l'adresse e-mail suivante :{' '}
                    <span className="font-bold text-primary">
                        {auth.user.email}
                    </span>
                </p>
            </div>
            <TicketList tickets={tickets} />
            <div className="flex justify-between items-center border-t pt-4">
                <div className="flex flex-col">
                    <span className="font-medium">Total</span>
                </div>
                <span>{totalAmount}€</span>
            </div>
            <Button
                variant={'customer_primary'}
                className="w-full mt-4 tracking-wider"
                disabled={!stripe || isProcessing}
                onClick={handleCheckout}
            >
                {isProcessing ? 'Paiement en cours...' : 'Payer'}
            </Button>
        </div>
    );
};

const TicketList = ({
    tickets,
}: {
    tickets: { admissions: Admission[]; extras: Extra[] };
}) => (
    <div className="space-y-4">
        {tickets.admissions.length > 0 && (
            <TicketGroup title="Billets" tickets={tickets.admissions} />
        )}
        {tickets.extras.length > 0 && (
            <TicketGroup title="Extras" tickets={tickets.extras} />
        )}
    </div>
);

const TicketGroup = ({
    title,
    tickets,
}: {
    title: string;
    tickets: (Admission | Extra)[];
}) => (
    <>
        <h3 className="text-lg font-bold uppercase tracking-wider leading-none">
            {title}
        </h3>
        <ul className="space-y-2">
            {tickets.map((ticket) => (
                <CheckoutTicket key={ticket.id} ticket={ticket} />
            ))}
        </ul>
    </>
);

const CheckoutTicket = ({ ticket }: { ticket: Admission | Extra }) => (
    <li className="flex justify-between items-center bg-gray-50 p-4 border">
        <div className="flex flex-col">
            <span className="font-medium">
                {ticket.name}{' '}
                <span className="text-sm text-black/50">
                    x{ticket.quantity}
                </span>
            </span>
            <span className="text-xs text-secondary">{ticket.price}€</span>
        </div>
        <span>{ticket.price * ticket.quantity}€</span>
    </li>
);
