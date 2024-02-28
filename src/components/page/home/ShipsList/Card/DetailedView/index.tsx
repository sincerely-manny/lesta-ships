'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer';
import { ArrowLeft } from 'lucide-react';
import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type DetailedViewProps = PropsWithChildren & {
    className?: string;
};

export default function DetailedView({ className = '', children = null }: DetailedViewProps) {
    return (
        <Drawer>
            <DrawerTrigger className={twMerge('focus-visible:outline-0', className)}>
                <span className="sr-only">Подробнее</span>
            </DrawerTrigger>
            <DrawerContent className="max-h-[90%]">
                <div className="h-full w-full overflow-y-auto overflow-x-clip">
                    <div className="container mx-auto overflow-hidden py-40">{children}</div>
                </div>
                <DrawerFooter>
                    <DrawerClose>
                        <Button>
                            <ArrowLeft size={16} className="mr-2" /> Назад
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
