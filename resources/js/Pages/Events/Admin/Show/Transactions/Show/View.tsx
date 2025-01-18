import EventSingleLayout from '@/Layouts/Admin/EventSingleLayout';
import { Event, PageProps, Transaction } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import View from '../View';
import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { capitalizeFirstLetter } from '@/utils';
const ShowTransactionView = () => {
    const { event, transaction } = usePage<
        PageProps<{
            event: Event;
            transaction: Transaction;
        }>
    >().props;
    console.log(transaction);
    return (
        <>
            <Dialog open={true}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Transaction #{transaction.reference}{' '}
                        </DialogTitle>
                        <DialogDescription>
                            Vous trouverez les détails de la transaction
                            ci-dessous.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div>
                            <Label>Montant</Label>
                            <Input
                                type="text"
                                value={`${transaction.amount} €`}
                                disabled
                            />
                        </div>
                        <div>
                            <Label>Status</Label>
                            <Input
                                type="text"
                                value={
                                    transaction.status === 'is_completed'
                                        ? 'Payé'
                                        : 'En attente'
                                }
                                disabled
                            />
                        </div>
                        <div>
                            <Label>Billets achetés</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {transaction.tickets.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="flex items-center justify-between border rounded-sm p-2 text-sm"
                                    >
                                        <div>
                                            {capitalizeFirstLetter(ticket.name)}
                                        </div>
                                        <div>{ticket.price} €</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label>Acheté par:</Label>
                            <Input
                                type="text"
                                value={transaction.user.name}
                                disabled
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {/* // Bouton Fermer */}
                        <Link
                            href={route('events.show', {
                                event: event.id,
                                panel: 'transactions',
                            })}
                        >
                            <Button>Fermer</Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <View event={event} />
        </>
    );
};

export default ShowTransactionView;
