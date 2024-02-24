'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from 'public/image/logo.png';
import { type HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Header({ className }: HTMLProps<HTMLDivElement>) {
    const pathname = usePathname();
    const isHome = pathname === '/';
    return (
        <header className={twMerge('flex items-center justify-center gap-20', className)}>
            {isHome ? (
                <span>
                    <Image src={logo} alt="Logo" width={250} height={250} priority placeholder="blur" />
                </span>
            ) : (
                <Link href="/">
                    <Image src={logo} alt="Logo" width={250} height={250} priority placeholder="blur" />
                </Link>
            )}
        </header>
    );
}
