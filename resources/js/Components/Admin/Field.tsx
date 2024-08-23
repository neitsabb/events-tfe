import { ErrorsProps } from '@/types';
import { cn } from '@/utils';
import { Label } from '../ui/label';

interface FieldProps {
  label: string;
  id: string;
  children: React.ReactNode;
  className?: string;
  errors?: ErrorsProps;
  required?: boolean;
}

export const Field: React.FC<FieldProps> = ({
  label,
  id,
  children,
  className,
  errors,
  required = true,
}) => {
  return (
    <div className={cn('w-full flex flex-col gap-3', className)}>
      <Label htmlFor={id} className="flex gap-1 items-center">
        {label}{' '}
        {required && (
          <span className="text-xs font-light text-destructive">*</span>
        )}
      </Label>
      {children}
      {errors && errors[id] && (
        <p className="text-xs text-red-500">{errors[id]}</p>
      )}
    </div>
  );
};
