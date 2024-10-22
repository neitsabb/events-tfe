import { useEffect, useState } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/Components/ui/command';

import { CoordsProps, ErrorsProps, StepsFields } from '@/types';
import { capitalize } from '@/utils';
import { MapsCard } from '../MapsCard';

interface PlaceProps {
    place_id: string;
    description: string;
}

export const LocationStep = ({
    setData,
    errors,
    coords,
    setCoords,
    defaultValue,
}: {
    setData: (
        key: keyof StepsFields,
        value: string | undefined | CoordsProps
    ) => void;
    errors: ErrorsProps;
    coords: CoordsProps;
    setCoords: (coords: CoordsProps) => void;
    defaultValue?: string;
}) => {
    const {
        value,
        suggestions: { status, data: places },
        setValue,
    } = usePlacesAutocomplete();

    const [isFilled, setIsFilled] = useState(!!defaultValue);
    const [isSelected, setIsSelected] = useState(!!defaultValue);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFilled(e.target.value.length > 0);
        setValue(capitalize(e.target.value));
    };

    const handleSelect = async (address: string) => {
        setValue(capitalize(address), false);

        const result = await getGeocode({ address });
        const { lat, lng } = await getLatLng(result[0]);

        setCoords({ lat, lng });
        setData('coords', { lat, lng });
        setData('location', capitalize(address));

        setIsSelected(true);
    };

    const cancelSelection = () => {
        setValue('');
        setIsFilled(false);
        setIsSelected(false);
    };

    return isSelected ? (
        <MapsCard
            value={defaultValue || value}
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
                    {status === 'OK' && (
                        <CommandGroup heading="Localisations">
                            {places.map(
                                ({ place_id, description }: PlaceProps) => (
                                    <CommandItem
                                        key={place_id}
                                        className="cursor-pointer"
                                        onSelect={() =>
                                            handleSelect(description)
                                        }
                                    >
                                        {description}
                                    </CommandItem>
                                )
                            )}
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
