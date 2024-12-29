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
}: PaymentFormProps) => {
    const { auth, event } = usePage<
        PageProps<{
            event: Event;
        }>
    >().props;
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
                    console.log('success');
                    setCheckout(true);
                },
                onError: (e) => {
                    console.log('error', e);
                },
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: route('payment.process'),
            },
        });

        if (error) {
            console.error(error.message);
            setProcessing(false);
        } else {
            // Le paiement est en cours de confirmation,
            // ou l'utilisateur est redirigé vers return_url.
        }
    };

    return checkOut ? (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold uppercase tracking-wider leading-none">
                Procéder au paiement
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <PaymentElement />
                <Button
                    className="w-full mt-4 uppercase !font-semibold tracking-wider"
                    disabled={!stripe || isProcessing}
                    type="submit"
                >
                    {isProcessing ? 'Paiement en cours...' : 'Payer'}
                </Button>
            </form>
        </div>
    ) : (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-bold uppercase tracking-wider leading-none">
                    Verification de la commande
                </h2>
                <p className="text-secondary-foreground text-sm">
                    Les billets seront envoyés à l'adresse e-mail suivante :{' '}
                    <span className="font-bold">{auth.user.email}</span>
                </p>
            </div>
            <div className="space-y-4">
                {tickets.admissions.length > 0 && (
                    <>
                        <h3 className="text-lg font-bold uppercase tracking-wider leading-none">
                            Billets
                        </h3>
                        <ul>
                            {tickets.admissions.map((admission) => (
                                <CheckoutTicket
                                    key={admission.id}
                                    ticket={admission}
                                />
                            ))}
                        </ul>
                    </>
                )}
                {tickets.extras.length > 0 && (
                    <>
                        <h3 className="text-lg font-bold uppercase tracking-wider leading-none">
                            Extras
                        </h3>
                        <ul>
                            {tickets.extras.map((extra) => (
                                <CheckoutTicket key={extra.id} ticket={extra} />
                            ))}
                        </ul>
                    </>
                )}
            </div>
            <div className="flex justify-between items-center border-t pt-4">
                <div className="flex flex-col ">
                    <span className="font-medium">Total</span>
                </div>
                <span>{totalAmount}€</span>
            </div>
            <Button
                className="w-full mt-4 uppercase !font-semibold tracking-wider"
                disabled={!stripe || isProcessing}
                onClick={handleCheckout}
            >
                {isProcessing ? 'Paiement en cours...' : 'Payer'}
            </Button>
        </div>
    );
};

const CheckoutTicket = ({ ticket }: { ticket: Admission | Extra }) => {
    return (
        <li className="flex justify-between items-center bg-gray-50 p-4  border">
            <div className="flex flex-col ">
                <span className="font-medium"> {ticket.name}</span>
                <span className="text-xs text-secondary-foreground">
                    {ticket.quantity}x
                </span>
            </div>
            <span>{ticket.price * ticket.quantity}€</span>
        </li>
    );
};
