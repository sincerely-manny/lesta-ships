import getClient from '@/lib/apollo-client';
import { gql } from '@/lib/gql/gql';
import Image from 'next/image';

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
    const { data, error } = await getShipsPaginated({ limit: 25, offset: 0 });
    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    return (
        <ul className="grid grid-cols-6 gap-5">
            {data?.map((v) => {
                return (
                    <li key={v?.id} className="outline-secondary-2 flex flex-col items-center outline">
                        <Image
                            src={'https:' + v?.icons?.medium}
                            alt={v?.title}
                            width={200}
                            height={200}
                            className="h-auto w-auto"
                        />
                        <p>{v?.title}</p>
                    </li>
                );
            })}
        </ul>
    );
}
