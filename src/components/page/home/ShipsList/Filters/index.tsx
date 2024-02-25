'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import flags from '@/lib/flags';
import roman from '@/lib/levels';
import useQueryParams from '@/lib/query-params';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Tag from './Tag';

type ShipsListFiltersProps = {
    className?: string;
    data: {
        types: Record<string, { title: string; icon: string }>;
        nations: Record<string, { title: string; color: string }>;
    };
};

function useCheckboxGroup(initial: string[] = []) {
    const [checked, setChecked] = useState<string[]>(initial);
    const onCheckedChange = (key: string) => (v: boolean) =>
        setChecked((prev) => (v ? [...prev, key] : prev.filter((x) => x !== key)));
    const isChecked = (key: string) => checked.includes(key);
    return [checked, onCheckedChange, isChecked, setChecked] as const;
}

export default function ShipsListFilters({ className = '', data: { types, nations } }: ShipsListFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { get } = useQueryParams();
    const [nationsChecked, onNationCheckedChange, isNationChecked] = useCheckboxGroup(get('nations')?.split(',') ?? []);
    const [typesChecked, onTypeCheckedChange, isTypeChecked] = useCheckboxGroup(get('types')?.split(',') ?? []);
    const [tiersChecked, onTierCheckedChange, isTierChecked] = useCheckboxGroup(get('tiers')?.split(',') ?? []);

    useEffect(() => {
        const query = new URLSearchParams();
        if (tiersChecked.length) {
            query.set('tiers', tiersChecked.join(','));
        }
        if (typesChecked.length) {
            query.set('types', typesChecked.join(','));
        }
        if (nationsChecked.length) {
            query.set('nations', nationsChecked.join(','));
        }
        router.push(`${pathname}?${query.toString()}`);
    }, [tiersChecked, typesChecked, nationsChecked, pathname, router]);

    return (
        <div className="flex flex-col gap-3">
            <div className={twMerge('flex gap-10', className)}>
                <Popover>
                    <PopoverTrigger>Типы</PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-1 text-sm">
                        {Object.entries(types).map(([key, { title, icon }]) => (
                            <div key={key} className="grid grid-cols-[1.5rem_1fr_24px] items-center gap-2">
                                <Checkbox
                                    id={`type-${key}`}
                                    checked={isTypeChecked(key)}
                                    onCheckedChange={onTypeCheckedChange(key)}
                                />
                                <label htmlFor={`type-${key}`}>
                                    <span>{title}</span>
                                </label>
                                <Image src={icon} alt={title} width={24} height={16} className="inline" />
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger>Нации</PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-1">
                        {Object.entries(nations).map(([key, { title }]) => (
                            <div key={key} className="grid grid-cols-[1.5rem_1fr_24px] items-center gap-2">
                                <Checkbox
                                    id={`nation-${key}`}
                                    checked={isNationChecked(key)}
                                    onCheckedChange={onNationCheckedChange(key)}
                                />
                                <label htmlFor={`nation-${key}`}>{title}</label>
                                {flags[key] && (
                                    <Image src={flags[key]!} alt={title} width={24} height={16} className="inline" />
                                )}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger>Уровни</PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-1">
                        {Array.from({ length: 9 }, (_, i) => i + 2).map((tier) => (
                            <div key={tier} className="grid grid-cols-[1.5rem_1fr_24px] items-center gap-2">
                                <Checkbox
                                    id={`tier-${tier}`.toString()}
                                    checked={isTierChecked(tier.toString())}
                                    onCheckedChange={onTierCheckedChange(tier.toString())}
                                />
                                <label htmlFor={`tier-${tier}`}>{roman(tier)}</label>
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex min-h-6 flex-wrap gap-3 text-xs">
                {nationsChecked.map(
                    (key) =>
                        nations[key] && (
                            <Tag key={key} action={() => onNationCheckedChange(key)(false)} color={nations[key]?.color}>
                                {nations[key]?.title}
                            </Tag>
                        ),
                )}
                {typesChecked.map(
                    (key) =>
                        types[key] && (
                            <Tag key={key} action={() => onTypeCheckedChange(key)(false)}>
                                {types[key]?.title}
                            </Tag>
                        ),
                )}
                {tiersChecked.map((tier) => (
                    <Tag
                        key={tier}
                        action={() => onTierCheckedChange(tier)(false)}
                        color={`#00${(parseInt(tier, 10) * 20).toString(16)}00`}
                    >
                        {roman(Number(tier))}
                    </Tag>
                ))}
            </div>
        </div>
    );
}
