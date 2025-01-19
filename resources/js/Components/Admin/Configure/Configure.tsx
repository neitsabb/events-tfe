import { DialogContent, DialogHeader } from '@/Components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import { useState } from 'react';
import Confetti from 'react-confetti';

import { Steps } from '@/Components/Admin/Configure/Steps';
import { Event } from '@/types';

type ConfigureProps = {
    event: Event;
};

export const Configure: React.FC<ConfigureProps> = ({ event }) => {
    const eventIsNotConfigured = event.status === 'not_configured';
    const [success, setSuccess] = useState(false);
    return (
        <>
            {success && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                />
            )}

            <Dialog open={eventIsNotConfigured}>
                <DialogContent className="rounded-sm w-[90%] md:w-full md:max-w-4xl !p-0 bg-gray-50  md:h-[600px]">
                    <DialogHeader>
                        <Steps event={event} setSuccess={setSuccess} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};
