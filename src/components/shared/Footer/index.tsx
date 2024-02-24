import { type HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Footer({ className }: HTMLProps<HTMLDivElement>) {
    return <footer className={twMerge('h-40', className)}>&nbsp;</footer>;
}
