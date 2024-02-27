import { Button } from '@/components/ui/button';
import Label from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronDown, SortDesc } from 'lucide-react';
import { type Dispatch, useEffect, useRef, useState, type SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

type SortingProps = {
    className?: string;
    sorted: string;
    setSorted: Dispatch<SetStateAction<string>>;
    applyFilters: () => void;
};

const sortingOptions = [
    { label: 'По уровню', value: 'tier' },
    { label: 'По типу', value: 'type' },
    { label: 'По нации', value: 'nation' },
    { label: 'По имени', value: 'name' },
] as const;

export default function Sorting({ className = '', sorted, setSorted, applyFilters }: SortingProps) {
    const [open, setOpen] = useState(false);
    const [trigger, setTrigger] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [popoverWidth, setPopoverWidth] = useState('0px');

    const handleOpenChange = (o: boolean) => {
        setOpen(o);
        setPopoverWidth(`${buttonRef.current?.offsetWidth}px` ?? '0px');
    };

    const handleValueChange = (value: string) => {
        setSorted(value);
        setTrigger(true);
    };

    useEffect(() => {
        if (trigger) {
            applyFilters();
            setTrigger(false);
        }
    }, [trigger, applyFilters]);
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
                            {sortingOptions.find((option) => option.value === sorted)?.label ?? 'Сортировка'}
                        </span>
                        <ChevronDown size={20} className="group-data-[state=open]:rotate-180" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="flex flex-col gap-1 text-sm"
                    style={{ minWidth: popoverWidth }}
                    onEscapeKeyDown={() => buttonRef.current?.focus()}
                >
                    <RadioGroup defaultValue={sorted} value={sorted} onValueChange={handleValueChange}>
                        {sortingOptions.map((option) => (
                            <div className="flex items-center space-x-2" key={option.value}>
                                <RadioGroupItem value={option.value} id={`sortby-${option.value}`} tabIndex={0} />
                                <Label htmlFor={`sortby-${option.value}`}>{option.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </PopoverContent>
            </Popover>
        </div>
    );
}
