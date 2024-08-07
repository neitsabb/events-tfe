import { Dialog, DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import Confetti from "react-confetti";
import { DialogContent, DialogHeader } from "@/Components/ui/dialog";

import { Steps } from "@/Components/Admin/Configure/Steps";
import { Event } from "@/types";

export const Configure = ({ event }: { event: Event }) => {
    const eventIsNotConfigured = event.status === "not_configured";
    const [success, setSuccess] = useState(false);
    return (
        <>
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                run={success}
                className="!z-50 absolute top-0 left-0"
            />

            <Dialog open={eventIsNotConfigured}>
                <DialogContent className="max-w-4xl !p-0 bg-gray-50 h-[600px]">
                    <DialogHeader>
                        <Steps event={event} setSuccess={setSuccess} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};
