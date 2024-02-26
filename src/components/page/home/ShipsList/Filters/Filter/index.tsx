import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import { type Dispatch, type SetStateAction, type PropsWithChildren } from 'react';

type FilterProps = {
    name: string;
    title: string;
    checked: string[];
    setChecked: Dispatch<SetStateAction<string[]>>;
    options: { optKey: string; optTitle: string; optIcon?: string | StaticImageData }[];
    applyFilters: () => void;
};

export default function Filter({
    name,
    title,
    checked,
    setChecked,
    options,
    children,
    applyFilters,
}: PropsWithChildren & FilterProps) {
    const isChecked = (key: string) => checked.includes(key);
    const onCheckedChange = (key: string) => (v: boolean) =>
        setChecked((prev) => (v ? [...prev, key] : prev.filter((x) => x !== key)));

    const handleOpenChange = (open: boolean) => {
        if (!open) applyFilters();
    };
    return (
        <Popover onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="secondary" className="group flex w-72 justify-between">
                    <span>{title}</span>
                    <ChevronDown size={20} className="group-data-[state=open]:rotate-180" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-1 text-sm">
                {children}

                {options.map(({ optKey, optTitle, optIcon }) => (
                    <div key={`${name}-${optKey}`} className="grid grid-cols-[1.5rem_1fr_24px] items-center gap-2">
                        <Checkbox
                            id={`${name}-${optKey}`}
                            checked={isChecked(optKey)}
                            onCheckedChange={onCheckedChange(optKey)}
                        />
                        <label htmlFor={`${name}-${optKey}`}>
                            <span>{optTitle}</span>
                        </label>
                        {optIcon && <Image src={optIcon} alt={optTitle} width={24} height={16} className="inline" />}
                    </div>
                ))}
                <Button
                    onClick={applyFilters}
                    className="outline-primary mt-3 bg-opacity-50 outline outline-1"
                    size="xs"
                >
                    Применить
                </Button>
            </PopoverContent>
        </Popover>
    );
}
