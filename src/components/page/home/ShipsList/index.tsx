import getClient from '@/lib/apollo-client';
import { gql } from '@/lib/gql/gql';

import Card from './Card';
import CardSkeleton from './Card/Skeleton';

const allShipsQuery = gql(`query ExampleQuery {
  vehicles(lang: "ru", isCatalogue: true) {
    id
    title
    description
    icons {
      large
      medium
    }
    level
    type {
      name
    	title
      icons {
        default
      }
    }
    nation {
      name
      title
      color
      icons {
        small
        medium
        large
      }
    }
  }
}
`);

const getAllShips = async () => {
    const { data, error } = await getClient().query({ query: allShipsQuery });
    return { data, error };
};

const getShipsPaginated = async ({ limit, offset }: { limit: number; offset: number }) => {
    const { data, error } = await getAllShips();
    if (!data.vehicles) {
        return { data: null, error: { message: 'Unknown error retrieving ships' } };
    }
    const vehicles = data.vehicles.slice(offset, offset + limit);
    return { data: vehicles, error };
};

export default async function ShipsList() {
    const { data, error } = await getShipsPaginated({ limit: 24, offset: 0 });
    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    return (
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
            <CardSkeleton />
        </ul>
    );
}
