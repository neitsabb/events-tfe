import { useState } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";

import { CoordsProps, ErrorsProps, StepsFields } from "@/types";
import { capitalize } from "@/utils";
import { MapsCard } from "../MapsCard";

export const LocationStep = ({
    setData,
    errors,
    coords,
    setCoords,
}: {
    setData: (key: keyof StepsFields, value: string | undefined) => void;
    errors: ErrorsProps;
    coords: CoordsProps;
    setCoords: (coords: CoordsProps) => void;
}) => {
    const {
        value,
        suggestions: { status, data: places },
        setValue,
    } = usePlacesAutocomplete();

    const [isFilled, setIsFilled] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFilled(e.target.value.length > 0);
        setValue(capitalize(e.target.value));
    };

    const handleSelect = async (address: string) => {
        setIsSelected(true);
        setValue(capitalize(address), false);
        setData("location", address);

        const result = await getGeocode({ address }); //get geocoding object
        const { lat, lng } = await getLatLng(result[0]);

        setCoords({ lat, lng });
    };

    const cancelSelection = () => {
        setValue("");
        setIsFilled(false);
        setIsSelected(false);
    };

    return isSelected ? (
        <MapsCard
            value={value}
            coords={coords}
            cancelSelection={cancelSelection}
        />
    ) : (
        <>
            <Command className="border-border border">
                <CommandInput
                    value={value}
                    onChangeCapture={handleInput}
                    placeholder="Tapez pour rechercher votre localisation"
                />
                <CommandList>
                    {places.length === 0 && isFilled && (
                        <CommandEmpty>Pas de résultat trouvé.</CommandEmpty>
                    )}
                    {status === "OK" && (
                        <CommandGroup heading="Localisations">
                            {places.map(({ place_id, description }: any) => (
                                <CommandItem
                                    key={place_id}
                                    className="cursor-pointer"
                                    onSelect={() => handleSelect(description)}
                                >
                                    {description}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            </Command>
            {errors?.location && (
                <p className="text-red-500 text-xs mt-6">{errors?.location}</p>
            )}
        </>
    );
};
