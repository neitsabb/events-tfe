import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';

export const FormSection = ({
    title,
    description,
    children,
    disabled = false,
    reset,
    onSubmit,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
    disabled?: boolean;
    reset?: () => void;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
    const handleReset = () => {
        if (reset) reset();
    };
    return (
        <Card className="divide-y">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription
                    dangerouslySetInnerHTML={{ __html: description }}
                    className="leading-tight"
                />
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="space-y-4 py-6">{children}</CardContent>
                {onSubmit && (
                    <CardFooter className="pt-6 justify-end gap-4">
                        {reset && (
                            <Button onClick={handleReset} variant="ghost">
                                Annuler
                            </Button>
                        )}
                        <Button disabled={disabled}>Sauvegarder</Button>
                    </CardFooter>
                )}
            </form>
        </Card>
    );
};
