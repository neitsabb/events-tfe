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
import { Button } from '@/Components/ui/button';
import { Field } from '../../Field';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';

interface PlaceProps {
    place_id: string;
    description: string;
}

export interface AddressComponents {
    street?: string;
    zip_code?: string;
    city?: string;
    country?: string;
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
        value: string | undefined | CoordsProps | AddressComponents
    ) => void;
    errors: ErrorsProps;
    coords: CoordsProps;
    setCoords: (coords: CoordsProps) => void;
    defaultValue?: string;
}) => {
    const [entryManual, setEntryManual] = useState(false);
    const [_address, setAddress] = useState<AddressComponents>({}); // New state for address components

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
        setEntryManual(false);
    };

    const formatAddress = (address: AddressComponents) => {
        return capitalize(
            `${address.street}, ${address.zip_code} ${address.city}, ${address.country}`
        );
    };

    const extractAddressComponents = (result: google.maps.GeocoderResult) => {
        const components = result.address_components;
        const newAddress: AddressComponents = {};

        components.forEach((component) => {
            const types = component.types;
            if (types.includes('street_number')) {
                newAddress.street =
                    (newAddress.street || '') + component.long_name + ' ';
            }
            if (types.includes('route')) {
                newAddress.street =
                    (newAddress.street || '') + component.long_name;
            }
            if (types.includes('postal_code')) {
                newAddress.zip_code = component.long_name;
            }
            if (types.includes('locality')) {
                newAddress.city = component.long_name;
            }
            if (types.includes('country')) {
                newAddress.country = component.long_name;
            }
        });

        return newAddress;
    };

    const handleSelect = async (address: string) => {
        setValue(capitalize(address), false);

        const result = await getGeocode({ address });
        const { lat, lng } = await getLatLng(result[0]);

        setCoords({ lat, lng });
        setData('coords', { lat, lng });

        const addressComponents = extractAddressComponents(result[0]);
        setAddress(addressComponents);
        setData('location', addressComponents);
        console.log('set location', addressComponents);

        // if (
        //     addressComponents.street &&
        //     addressComponents.zip_code &&
        //     addressComponents.city &&
        //     addressComponents.country
        // ) {
        setIsSelected(true);
        // }
    };

    const handleManualSubmit = async () => {
        if (
            _address.street &&
            _address.city &&
            _address.zip_code &&
            _address.country
        ) {
            const formattedAddress = formatAddress(_address);

            try {
                const results = await getGeocode({ address: formattedAddress });
                const { lat, lng } = await getLatLng(results[0]);

                setCoords({ lat, lng });
                setData('coords', { lat, lng });
                setData('location', _address);
                setIsSelected(true);
                setValue(formattedAddress);
                console.log('set location: ', _address);
            } catch (error) {
                console.error('Failed to geocode manual address:', error);
                // Optionally handle errors (e.g., show a message to the user).
            }
        }
    };

    const cancelSelection = () => {
        setValue('');
        setIsFilled(false);
        setIsSelected(false);
        setAddress({});
    };

    const handleEntryManual = () => {
        cancelSelection();
        setEntryManual(true);
    };

    const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
        // setData('location', { ...address, [name]: value });

        console.log(_address);
    };

    useEffect(() => {
        if (
            _address.street &&
            _address.zip_code &&
            _address.city &&
            _address.country
        ) {
            handleManualSubmit();
        }
    }, [_address]);

    return isSelected ? (
        <>
            <MapsCard
                value={value || defaultValue}
                coords={coords}
                cancelSelection={cancelSelection}
            />
            {errors?.location && (
                <p className="text-red-500 text-xs mt-6">{errors?.location}</p>
            )}
        </>
    ) : (
        <>
            <div className="flex flex-col gap-y-4">
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

                <span className="text-center text-sm italic">ou</span>
                <Button
                    type="button"
                    variant={'outline'}
                    onClick={handleEntryManual}
                >
                    Entrer manuellement
                </Button>
                {entryManual && (
                    <div className="space-y-4 border-t pt-4">
                        <Field label="Rue" id="street">
                            <Input
                                name="street"
                                value={_address.street || ''}
                                onChange={handleManualChange}
                                placeholder="Nom de la rue"
                            />
                        </Field>
                        <div className="flex gap-x-4">
                            <Field label="Ville" id="city">
                                <Input
                                    name="city"
                                    value={_address.city || ''}
                                    onChange={handleManualChange}
                                    placeholder="Nom de la ville"
                                />
                            </Field>
                            <Field label="Code postal" id="zip_code">
                                <Input
                                    name="zip_code"
                                    value={_address.zip_code || ''}
                                    onChange={handleManualChange}
                                    placeholder="Code postal"
                                />
                            </Field>
                            <Field label="Pays" id="country">
                                <Select
                                    onValueChange={(value) =>
                                        handleManualChange({
                                            target: {
                                                name: 'country',
                                                value,
                                            },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder="Pays"
                                            // value={_address.country}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BE">
                                            Belgique
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>
                    </div>
                )}
            </div>
            {errors?.location && (
                <p className="text-red-500 text-xs mt-6">{errors?.location}</p>
            )}
        </>
    );
};
