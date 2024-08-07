import { Button } from "@/Components/ui/button";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export const SteppersTabs = ({
    currentStep,
    steps,
}: {
    currentStep: number;
    steps: any[];
}) => {
    const isCompleted = (idx: number) => idx < currentStep;
    const isCurrentStep = (idx: number) => idx === currentStep;

    return (
        <div className=" py-4">
            <nav className="flex justify-center" aria-label="Progress">
                <ol role="list" className="">
                    {steps.map((step, idx) => (
                        <li key={step.key}>
                            {isCompleted(idx) ? (
                                <Button variant="none" className="group ">
                                    <span className="flex items-start">
                                        <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                                            <CheckCircledIcon
                                                className="h-full w-full text-primary group-hover:text-primary/50"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                                            {step.label}
                                        </span>
                                    </span>
                                </Button>
                            ) : isCurrentStep(idx) ? (
                                <Button variant="none" className="group !p-0">
                                    <span
                                        className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                                        aria-hidden="true"
                                    >
                                        <span className="absolute h-4 w-4 rounded-full bg-primary/15" />
                                        <span className="relative block h-2 w-2 rounded-full bg-primary" />
                                    </span>
                                    <span className="ml-3 text-sm font-medium text-primary">
                                        {step.label}
                                    </span>
                                </Button>
                            ) : (
                                <Button variant="none" className="group !p-0">
                                    <div className="flex items-start">
                                        <div
                                            className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                                            aria-hidden="true"
                                        >
                                            <div className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
                                        </div>
                                        <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                                            {step.label}
                                        </p>
                                    </div>
                                </Button>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};
