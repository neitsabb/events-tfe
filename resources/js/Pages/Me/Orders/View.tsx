import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { ProfileLayout } from '@/Layouts/Customer/ProfileLayout';

const View = () => {
    return (
        <ProfileLayout title="Mes commandes">
            <ul className="space-y-6">
                <li className="bg-white space-y-4 p-6 border border-dashed">
                    <div className="flex justify-between">
                        <span className="font-integral">Evenement</span>
                        <span>Event Name</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-integral">Statut</span>
                        <span>Payée</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-integral">Total</span>
                        <span className="font-bold">12,99€</span>
                    </div>
                    <Button variant="customer_yellow">
                        Télécharger les billets
                    </Button>
                </li>
                <li className="bg-white space-y-4 p-6 border border-dashed">
                    <div className="flex justify-between">
                        <span className="font-integral">Evenement</span>
                        <span>Event Name</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-integral">Statut</span>
                        <span>Payée</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-integral">Total</span>
                        <span className="font-bold">12,99€</span>
                    </div>
                    <Button variant="customer_yellow">
                        Télécharger les billets
                    </Button>
                </li>
            </ul>
        </ProfileLayout>
    );
};

export default View;
