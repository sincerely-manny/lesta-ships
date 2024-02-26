'use client';

import { Button } from '@/components/ui/button';
import flags from '@/lib/flags';
import roman from '@/lib/levels';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Filters } from '../data/ships';
import Filter from './Filter';
import Tags from './Tags';

type ShipsListFiltersProps = {
    className?: string;
    data: {
        types: Record<string, { title: string; icon: string }>;
        nations: Record<string, { title: string; color: string }>;
        applied: Filters;
    };
};

function getFiltersQueryString({ tiers, types, nations }: Filters) {
    const query = new URLSearchParams();
    if (tiers?.length) {
        query.set('tiers', tiers.join(','));
    }
    if (types?.length) {
        query.set('types', types.join(','));
    }
    if (nations?.length) {
        query.set('nations', nations.join(','));
    }
    return query.toString();
}

function ApplyButton({ onClick }: { onClick: () => void }) {
    return (
        <Button onClick={onClick} className="mt-4 opacity-80" size="xs">
            Применить
        </Button>
    );
}

export default function ShipsListFilters({ className = '', data: { types, nations, applied } }: ShipsListFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [nationsChecked, setNationsChecked] = useState(applied.nations ?? []);
    const [typesChecked, setTypesChecked] = useState(applied.types ?? []);
    const [tiersChecked, setTiersChecked] = useState(applied.tiers ?? []);

    const [filtersQuery, setFiltersQuery] = useState(getFiltersQueryString(applied));
    const [filtersQueryPrev, setFiltersQueryPrev] = useState(getFiltersQueryString(applied));

    const applyFilters = () => {
        setFiltersQuery(getFiltersQueryString({ tiers: tiersChecked, types: typesChecked, nations: nationsChecked }));
    };

    useEffect(() => {
        // prevent double push and push on initial render
        if (filtersQuery === filtersQueryPrev) {
            return;
        }
        // cleunup page query
        router.push(`${pathname}?${filtersQuery.toString()}`);
        setFiltersQueryPrev(filtersQuery);
    }, [filtersQuery, pathname, router, filtersQueryPrev]);

    const resetFilters = () => {
        setNationsChecked([]);
        setTypesChecked([]);
        setTiersChecked([]);
    };

    // const [loading, setLoading] = useState(false);
    // const handleApplyClick = () => {
    //     applyFilters();
    //     setLoading(true);
    // };

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // const setFiltersQueryDebounced = useCallback(debounce(setFiltersQuery, 700), []);
    // useEffect(() => {
    //     setFiltersQueryDebounced(
    //         getFiltersQueryString({ tiers: tiersChecked, types: typesChecked, nations: nationsChecked }),
    //     );
    // }, [tiersChecked, typesChecked, nationsChecked, setFiltersQueryDebounced]);

    return (
        <div className="flex flex-col gap-3">
            <div className={twMerge('flex gap-10', className)} key={JSON.stringify(applied)}>
                <Filter
                    checked={nationsChecked}
                    setChecked={setNationsChecked}
                    title="Нации"
                    name="nations"
                    options={Object.entries(nations).map(([key, { title }]) => ({
                        optKey: key,
                        optTitle: title,
                        optIcon: flags[key],
                    }))}
                    applyFilters={applyFilters}
                >
                    применить
                </Filter>
                <Filter
                    checked={typesChecked}
                    setChecked={setTypesChecked}
                    title="Типы"
                    name="types"
                    options={Object.entries(types).map(([key, { title, icon }]) => ({
                        optKey: key,
                        optTitle: title,
                        optIcon: icon,
                    }))}
                    applyFilters={applyFilters}
                >
                    применить
                </Filter>
                <Filter
                    checked={tiersChecked}
                    setChecked={setTiersChecked}
                    title="Уровни"
                    name="tiers"
                    options={Array.from({ length: 9 }, (_, i) => {
                        const tier = i + 2;
                        return {
                            optKey: tier.toString(),
                            optTitle: roman(tier) ?? tier.toString(),
                        };
                    })}
                    applyFilters={applyFilters}
                >
                    43
                </Filter>
            </div>
            <div className="flex min-h-6 flex-wrap gap-3 text-xs">
                {nationsChecked.length !== 0 || typesChecked.length !== 0 || tiersChecked.length !== 0 ? (
                    <button
                        onClick={resetFilters}
                        type="button"
                        className="underline decoration-dashed underline-offset-2"
                    >
                        Сбросить фильтры
                    </button>
                ) : null}
                <Tags
                    checked={nationsChecked.map((key) => ({
                        key,
                        title: nations[key]?.title ?? key,
                        color: nations[key]?.color,
                    }))}
                    setChecked={setNationsChecked}
                    applyFilters={applyFilters}
                />
                <Tags
                    checked={typesChecked.map((key) => ({
                        key,
                        title: types[key]?.title ?? key,
                    }))}
                    setChecked={setTypesChecked}
                    applyFilters={applyFilters}
                />
                <Tags
                    checked={tiersChecked.map((tier) => ({
                        key: tier,
                        title: roman(tier) ?? tier.toString(),
                        color: `#00${(parseInt(tier, 10) * 20).toString(16)}00`,
                    }))}
                    setChecked={setTiersChecked}
                    applyFilters={applyFilters}
                />
            </div>
        </div>
    );
}
