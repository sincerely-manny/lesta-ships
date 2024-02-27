import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, SortDesc } from 'lucide-react';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type SortingProps = {
    className?: string;
};

const sortingOptions = [
    { label: 'По уровню', value: 'tier' },
    { label: 'По типу', value: 'type' },
    { label: 'По нации', value: 'nation' },
    { label: 'По имени', value: 'name' },
] as const;

export default function Sorting({ className = '' }: SortingProps) {
    const [open, setOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [popoverWidth, setPopoverWidth] = useState('0px');

    const handleOpenChange = (o: boolean) => {
        setOpen(o);
        setPopoverWidth(`${buttonRef.current?.offsetWidth}px` ?? '0px');
        // if (!open) applyFilters();
    };
    return (
        <div>
            <Popover onOpenChange={handleOpenChange} open={open}>
                <PopoverTrigger asChild>
                    <Button
                        variant="secondary"
                        size="sm"
                        className={twMerge('group flex justify-between gap-2', className)}
                        tabIndex={0}
                        ref={buttonRef}
                    >
                        <span>
                            <SortDesc className="mr-1 inline" size={16} />
                            <span className="sr-only">Сортировать:</span>
                            Sort
                        </span>
                        <ChevronDown size={20} className="group-data-[state=open]:rotate-180" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="flex flex-col gap-1 text-sm"
                    style={{ minWidth: popoverWidth }}
                    onEscapeKeyDown={() => buttonRef.current?.focus()}
                >
                    1
                </PopoverContent>
            </Popover>
        </div>
    );
}
