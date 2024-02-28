'use server';

import 'server-only';
import getClient from '@/lib/apollo-client';
import { gql } from '@/lib/gql/gql';
import cache from '@/lib/cache';

const byIdQuery = gql(`query ByIdQuery($vehicleId: String) {
    vehicles(lang: "ru", vehicleId: $vehicleId, ) {
    id
    description
    ttc {
        description
        name
        title
        unit
        value
    }
  }
}
`);

const getShipById = async (id: string) => {
    const { data, error } = await getClient().query({ query: byIdQuery, variables: { vehicleId: id } });
    return { data, error };
};

export default getShipById;
