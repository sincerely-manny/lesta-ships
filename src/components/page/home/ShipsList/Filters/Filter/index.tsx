import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import debounce from 'lodash.debounce';
import { ChevronDown } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import {
    type Dispatch,
    type SetStateAction,
    type PropsWithChildren,
    useRef,
    useState,
    useCallback,
    useEffect,
} from 'react';
import { twMerge } from 'tailwind-merge';

type FilterProps = {
    name: string;
    title: string;
    className?: string;
    checked: string[];
    setChecked: Dispatch<SetStateAction<string[]>>;
    options: { optKey: string; optTitle: string; optIcon?: string | StaticImageData }[];
    applyFilters: () => void;
};

export default function Filter({
    name,
    title,
    className = '',
    checked,
    setChecked,
    options,
    children,
    applyFilters,
}: PropsWithChildren & FilterProps) {
    const [open, setOpen] = useState(false);
    const [trigger, setTrigger] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setTridderDebounced = useCallback(debounce(setTrigger, 1000), []);

    const isChecked = (key: string) => checked.includes(key);
    const onCheckedChange = (key: string) => (v: boolean) => {
        setChecked((prev) => (v ? [...prev, key] : prev.filter((x) => x !== key)));
        setTridderDebounced(true);
    };

    useEffect(() => {
        if (trigger) {
            setTrigger(false);
            applyFilters();
        }
    }, [trigger, applyFilters]);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [popoverWidth, setPopoverWidth] = useState('0px');

    const handleOpenChange = (o: boolean) => {
        setOpen(o);
        setPopoverWidth(`${buttonRef.current?.offsetWidth}px` ?? '0px');
        if (!o) applyFilters();
    };
    return (
        <Popover onOpenChange={handleOpenChange} open={open}>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    size="sm"
                    className={twMerge('group flex w-full justify-between gap-2', className)}
                    ref={buttonRef}
                    tabIndex={0}
                >
                    <span>{title}</span>
                    <ChevronDown size={20} className="group-data-[state=open]:rotate-180" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="flex flex-col gap-1 text-sm"
                style={{ minWidth: popoverWidth }}
                onEscapeKeyDown={() => buttonRef.current?.focus()}
            >
                {children}

                {options.map(({ optKey, optTitle, optIcon }) => (
                    <div key={`${name}-${optKey}`} className="grid grid-cols-[1.5rem_1fr_24px] items-center gap-2">
                        <Checkbox
                            id={`${name}-${optKey}`}
                            checked={isChecked(optKey)}
                            onCheckedChange={onCheckedChange(optKey)}
                            tabIndex={0}
                        />
                        <label htmlFor={`${name}-${optKey}`}>
                            <span>{optTitle}</span>
                        </label>
                        {optIcon && (
                            <Image src={optIcon} alt={optTitle} width={24} height={16} className="inline" unoptimized />
                        )}
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    );
}
