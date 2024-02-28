'use client';

import flags from '@/lib/flags';
import roman from '@/lib/levels';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Filters } from '../data/ships';
import Filter from './Filter';
import ResetTags from './ResetTags';
import Tags from './Tags';
import TextSearch from './TextSearch';
import Sorting from './Sorting';

type ShipsListFiltersProps = {
    className?: string;
    data: {
        types: Record<string, { title: string; icon: string }>;
        nations: Record<string, { title: string; color: string }>;
        applied: Filters;
        sort: string;
    };
};

function getQueryString({ tiers, types, nations, search, sort }: Filters & { sort?: string }) {
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
    const searchTrimmed = search?.trim();
    if (searchTrimmed?.length) {
        query.set('search', searchTrimmed);
    }
    if (sort) {
        query.set('sort', sort);
    }
    return query.toString();
}

export default function ShipsListFilters({
    className = '',
    data: { types, nations, applied, sort },
}: ShipsListFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [nationsChecked, setNationsChecked] = useState(applied.nations ?? []);
    const [typesChecked, setTypesChecked] = useState(applied.types ?? []);
    const [tiersChecked, setTiersChecked] = useState(applied.tiers ?? []);

    const [searchText, setSearchText] = useState(applied.search ?? '');

    const [selectedSort, setSelectedSort] = useState(sort);

    const [filtersQuery, setFiltersQuery] = useState(getQueryString(applied));
    const [filtersQueryPrev, setFiltersQueryPrev] = useState(getQueryString(applied));

    const [isLoading, setIsLoading] = useState(false);

    const applyFilters = () => {
        setFiltersQuery(
            getQueryString({
                tiers: tiersChecked,
                types: typesChecked,
                nations: nationsChecked,
                search: searchText,
                sort: selectedSort,
            }),
        );
    };

    useEffect(() => {
        // prevent double push and push on initial render
        if (filtersQuery === filtersQueryPrev) {
            return;
        }
        setIsLoading(true);
        // cleunup page query
        router.push(`${pathname}?${filtersQuery.toString()}`);
        setFiltersQueryPrev(filtersQuery);
    }, [filtersQuery, pathname, router, filtersQueryPrev]);
    useEffect(() => {
        setIsLoading(false);
    }, [applied]);

    const filterClassName = 'w-[400px] md:w-auto';

    return (
        <div className={twMerge('flex w-full flex-col gap-3', className)}>
            <div className="flex w-full flex-col flex-wrap items-center justify-start gap-2 md:flex-row md:gap-5">
                <TextSearch
                    value={searchText}
                    setValue={setSearchText}
                    applyFilters={applyFilters}
                    className={filterClassName}
                />
                <Sorting
                    className="w-[400px] md:w-36"
                    sorted={selectedSort}
                    setSorted={setSelectedSort}
                    applyFilters={applyFilters}
                />
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
                    className={filterClassName}
                />
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
                    className={filterClassName}
                />
                <Filter
                    checked={tiersChecked}
                    setChecked={setTiersChecked}
                    title="Уровни"
                    name="tiers"
                    options={Array.from({ length: 10 }, (_, i) => {
                        const tier = i + 1;
                        return {
                            optKey: tier.toString(),
                            optTitle: roman(tier) ?? tier.toString(),
                        };
                    })}
                    applyFilters={applyFilters}
                    className={filterClassName}
                />
            </div>
            <div className="mx-auto flex min-h-6 w-[400px] flex-wrap gap-3 text-xs md:w-full">
                <ResetTags
                    setters={[setTypesChecked, setTiersChecked, setNationsChecked]}
                    applyFilters={applyFilters}
                    show={nationsChecked.length !== 0 || typesChecked.length !== 0 || tiersChecked.length !== 0}
                />
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
                {isLoading && <Loader2 className="h-6 w-6 animate-spin opacity-80" />}
            </div>
        </div>
    );
}
