import { Admission, Event, Extra } from '@/types';
import React from 'react';

const View = ({
    event,
    admissions,
    extras,
}: {
    event: Event;
    admissions: Admission[];
    extras: Extra[];
}) => {
    console.log(event, admissions, extras);
    return <div>Checkout</div>;
};

export default View;
