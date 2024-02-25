import Card from './Card';
import ShipsListPagination from './Pagination';
import ShipsListFilters from './Filters';
import { getAllShips, getNations, getShipsPaginated, getTypes } from './data/ships';

type ShipsListProps = {
    limit?: number;
    page?: number;
};

export default async function ShipsList({ limit = 24, page = 1 }: ShipsListProps) {
    const offset = (page - 1) * limit;
    const {
        data: { vehicles: allShips },
        error,
    } = await getAllShips();
    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }
    const types = await getTypes(allShips).then((res) => res?.data);
    const nations = await getNations(allShips).then((res) => res?.data);
    if (!types || !nations) {
        return <div>Error loading filters</div>;
    }
    const total = allShips?.length;
    const { data } = await getShipsPaginated({ limit, offset, ships: allShips });
    return (
        <section className="relative flex flex-col items-center">
            <div className="mb-10 flex w-full justify-between">
                <ShipsListFilters data={{ types, nations }} />
                <div />
            </div>
            <ul className="grid items-stretch gap-3 transition-all md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-6">
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
