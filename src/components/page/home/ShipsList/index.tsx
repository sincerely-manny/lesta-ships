import Card from './Card';
import ShipsListPagination from './Pagination';
import ShipsListFilters from './Filters';
import {
    type Filters,
    getAllShips,
    getNations,
    getShipsFiltered,
    getShipsPaginated,
    getTypes,
    sortShips,
} from './data/ships';

type ShipsListProps = {
    limit?: number;
    page?: number;
    filters?: Filters;
    sort: string;
};

export default async function ShipsList({ limit = 24, page = 1, filters, sort }: ShipsListProps) {
    const offset = (page - 1) * limit;
    const {
        data: { vehicles: allShips },
        error,
    } = await getAllShips();
    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }
    const types = getTypes(allShips).data;
    const nations = getNations(allShips).data;
    if (!types || !nations) {
        return <div>Error loading data</div>;
    }
    const filtered = getShipsFiltered(allShips, filters ?? {}).data;
    const total = filtered?.length ?? 0;
    const sorted = sortShips(filtered, sort).data;
    const { data } = getShipsPaginated({ limit, offset, ships: sorted });
    return (
        <section className="relative flex w-full flex-col items-center">
            <ShipsListFilters data={{ types, nations, applied: filters ?? {}, sort }} className="mb-3" />
            <ul className="grid max-w-fit items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-6">
                {data?.map((v) => (
                    <Card
                        key={v?.id}
                        data={{
                            id: v?.id ?? '',
                            title: (v?.title as string) ?? '',
                            image: `https:${v?.icons?.medium}`,
                            level: v?.level ?? '0',
                            type: {
                                title: (v?.type?.title as string) ?? '',
                                icon: `https:${v?.type?.icons?.default}`,
                            },
                            nation: {
                                title: (v?.nation?.title as string) ?? '',
                                color: (v?.nation?.color as string) ?? '',
                                icon: `https:${v?.nation?.icons?.large}`,
                            },
                        }}
                    />
                ))}
            </ul>
            <ShipsListPagination limit={limit} page={page} total={total ?? 0} key={Date.now()} />
        </section>
    );
}
