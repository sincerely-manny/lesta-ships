import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
    return (
        <Popover>
            <PopoverTrigger>{title}</PopoverTrigger>
            <PopoverContent className="flex flex-col gap-1 text-sm">
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
                {children}
            </PopoverContent>
        </Popover>
    );
}
