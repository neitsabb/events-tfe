import { Button } from '@/Components/ui/button';
import { ProfileLayout } from '@/Layouts/Customer/ProfileLayout';

const View = () => {
    return (
        <ProfileLayout title="Mes informations">
            <form className="space-y-6">
                <div className="w-full grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="font-integral text-sm text-muted-foreground">
                            Nom
                        </label>
                        <input
                            type="text"
                            value="John"
                            className="bg-white px-2 py-1.5 outline-none border focus:ring-offset-2 focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-integral text-sm text-muted-foreground">
                            Prénom
                        </label>
                        <input
                            type="text"
                            value="John"
                            className="bg-white px-2 py-1.5 outline-none border focus:ring-offset-2 focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-integral text-sm text-muted-foreground">
                        email
                    </label>
                    <input
                        type="email"
                        value="John"
                        className="bg-white px-2 py-1.5 outline-none border focus:ring-offset-2 focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-integral text-sm text-muted-foreground">
                        Téléphone
                    </label>
                    <input
                        type="tel"
                        value="John"
                        className="bg-white px-2 py-1.5 outline-none border focus:ring-offset-2 focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-integral text-sm text-muted-foreground">
                        Date de naissance
                    </label>
                    <input
                        type="date"
                        value="John"
                        className="bg-white px-2 py-1.5 outline-none border focus:ring-offset-2 focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <Button variant="customer_primary">Enregistrer</Button>
                </div>
            </form>
        </ProfileLayout>
    );
};

export default View;
