import { CoordsProps } from '@/types';
import {
    AdvancedMarker,
    APIProvider,
    Map,
    Pin,
} from '@vis.gl/react-google-maps';
import { Button } from '@/Components/ui/button';
import { AddressComponents } from './Steps/LocationStep';

export const MapsCard = ({
    value,
    coords,
    cancelSelection,
}: {
    value: string | undefined | AddressComponents;
    coords: CoordsProps;
    cancelSelection: () => void;
}) => {
    return (
        <div className="bg-gray-100 text-card-foreground border border-border  rounded-md">
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map
                    style={{
                        width: '100%',
                        height: '148px',
                        borderRadius: '16px',
                    }}
                    zoom={16}
                    center={{ lat: coords?.lat, lng: coords?.lng }}
                    mapId="35f7ad3bd275c6c"
                    disableDefaultUI={true}
                >
                    <AdvancedMarker
                        position={{ lat: coords?.lat, lng: coords?.lng }}
                    >
                        <Pin />
                    </AdvancedMarker>
                </Map>
            </APIProvider>
            <div className="flex flex-col items-center space-y-4 px-4 py-6 bg-white rounded-bl-md rounded-br-md">
                <span className="text-sm max-w-sm font-medium">{value}</span>
                <Button
                    type="button"
                    variant="outline"
                    onClick={cancelSelection}
                >
                    Changer de localisation
                </Button>
            </div>
        </div>
    );
};
