'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer';
import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type DetailedViewProps = PropsWithChildren & {
    className?: string;
    shipId: string;
};

export default function DetailedView({ className = '', children = null, shipId }: DetailedViewProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const viewId = searchParams.get('view');
    const [isOpen, setIsOpen] = useState(viewId === shipId);
    const handleOpenChange = (v: boolean) => {
        const params = new URLSearchParams(searchParams.toString());
        if (v) {
            setIsOpen(true);
            params.set('view', shipId);
        } else {
            setIsOpen(false);
            params.delete('view');
        }
        router.push(`${pathname}?${params.toString()}`);
    };
    return (
        <Drawer onOpenChange={handleOpenChange} open={isOpen}>
            <DrawerTrigger className={twMerge('focus-visible:outline-0', className)}>
                <span className="sr-only">Подробнее</span>
            </DrawerTrigger>
            <DrawerContent className="max-h-[90%]">
                <div className="h-full w-full overflow-y-auto overflow-x-clip">
                    <div className="container mx-auto overflow-hidden py-10">{children}</div>
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button>
                            <ArrowLeft size={16} className="mr-2" /> Назад
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
