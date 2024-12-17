import { cn } from '@/utils';
import React from 'react';

interface TitleProps {
  title: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export const Title = ({ title, level, className }: TitleProps) => {
  switch (level) {
    case 'h1':
      return <h1 className={cn('text-2xl font-bold', className)}>{title}</h1>;
    case 'h2':
      return <h2 className="text-2xl font-bold">{title}</h2>;
    case 'h3':
      return (
        <h3 className={cn('text-xl font-semibold', className)}>{title}</h3>
      );
    case 'h4':
      return <h4 className={cn('text-lg font-medium', className)}>{title}</h4>;
    case 'h5':
      return <h5 className="text-base">{title}</h5>;
    case 'h6':
      return <h6 className="text-base">{title}</h6>;
  }
  return <div>Title</div>;
};
