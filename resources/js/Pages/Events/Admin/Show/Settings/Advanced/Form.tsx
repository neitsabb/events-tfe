import { Input } from "@/Components/ui/input";
import { Field } from "../../Tickets/Partials/CreateTicketForm";
import { FormSection } from "../General/Form";
import Checkbox from "@/Components/Checkbox";
import { useState } from "react";
import { Button } from "@/Components/ui/button";

export const AdvancedForm = () => {
    // Déclarez un état local pour suivre si la checkbox est cochée ou non
    const [isAgeChecked, setIsAgeChecked] = useState(false);

    // Fonction pour gérer le changement de la checkbox
    const handleCheckboxChange = (e) => {
        setIsAgeChecked(e.target.checked);
    };

    return (
        <>
            <div className="flex items-center justify-between rounded-lg border border-dashed border-destructive bg-white shadow-sm p-4">
                <div className="flex flex-col gap-1 justify-center">
                    <h4 className="text-md font-semibold">
                        Archiver l'événement
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Cette action archivera cet événement et le rendra
                        inacessible au public.
                    </p>
                </div>
                <Button>Archiver</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-dashed border-destructive bg-white shadow-sm p-4">
                <div className="flex flex-col gap-1 justify-center">
                    <h4 className="text-md font-semibold">
                        Supprimer l'événement
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Cette action supprimera définitivement cet événement,
                        ainsi que toutes les données associées.
                    </p>
                </div>
                <Button>Supprimer</Button>
            </div>
        </>
    );
};
