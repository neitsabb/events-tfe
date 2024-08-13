import { CustomerPageHeader } from "@/Components/Customer/CustomerPageHeader";
import CustomerLayout from "@/Layouts/Customer/CustomerLayout";
import { Artist } from "@/types";
import { Link } from "@inertiajs/react";
import React from "react";

const View = ({ artists }: { artists: Artist[] }) => {
    return (
        <CustomerLayout bg={true}>
            <div className="container !max-w-7xl">
                <CustomerPageHeader>Artistes populaires</CustomerPageHeader>
                <ArtistsGrid artists={artists} />
            </div>
        </CustomerLayout>
    );
};

export default View;

const ArtistsGrid = ({ artists }: { artists: Artist[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {artists?.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
            ))}
        </div>
    );
};

const ArtistCard = ({ artist }: { artist: Artist }) => {
    return (
        <Link
            href="#"
            className="flex items-center gap-3 bg-primary/5 p-4 rounded-lg group"
        >
            <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full aspect-square object-cover opacity-75 group-hover:opacity-100 transition-opacity"
                />
            </div>
            <div className="flex flex-col">
                <h3 className="text-lg font-bold text-white">{artist.name}</h3>
                <p className="text-sm text-primary/50">23,320 abonnés</p>
            </div>
        </Link>
    );
};
