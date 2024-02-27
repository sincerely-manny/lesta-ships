import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/styles';

const buttonVariants = cva(
    'cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary ring-offset-primary/20 focus-visible:ring-1 focus-visible:outline-none ring-offset-1',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                ghost: 'bg-transparent text-white hover:bg-primary/10',
                secondary:
                    'focus-visible:ring-primary ring-offset-secondary-1 bg-secondary-2/20 outline-primary/40  hover:outline-primary/60 h-9 w-full rounded-md px-3 text-sm font-medium text-white outline outline-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary-2/30 font-light',
                link: 'text-white underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                xs: 'h-6 rounded-md px-2 text-xs font-light',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    // eslint-disable-next-line react/require-default-props
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
