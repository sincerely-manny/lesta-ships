import getClient from '@/lib/apollo-client';
import { gql } from '@/lib/gql/gql';

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

export const getAllShips = async () => {
    const { data, error } = await getClient().query({ query: allShipsQuery });
    return { data, error };
};

type Vehicles = Awaited<ReturnType<typeof getAllShips>>['data']['vehicles'];

export const getTypes = (data: Vehicles) => {
    if (!data) {
        return { data: null, error: { message: 'Unknown error retrieving types' } };
    }
    const types = new Map<string, { title: string; icon: string }>();
    data.forEach((v) => {
        if (v?.type?.name && v?.type?.title && v?.type?.icons?.default) {
            types.set(v.type.name, { title: v.type.title as string, icon: `https:${v.type.icons.default}` });
        }
    });
    return { data: Object.fromEntries(types), error: null };
};

export const getNations = (data: Vehicles) => {
    if (!data) {
        return { data: null, error: { message: 'Unknown error retrieving nations' } };
    }
    const nations = new Map<string, { title: string; color: string }>();
    data.forEach((v) => {
        if (v?.nation?.name && v?.nation?.title) {
            nations.set(v.nation.name, { title: v.nation.title as string, color: v.nation.color as string });
        }
    });
    return { data: Object.fromEntries(nations), error: null };
};

export type Filters = {
    types?: string[];
    nations?: string[];
    tiers?: string[];
};

export const getShipsFiltered = (data: Vehicles, filters: Filters) => {
    if (!data) {
        return { data: null, error: { message: 'Unknown error filtering ships' } };
    }
    const fitlered = data.filter((v) => {
        const type = !filters.types || filters.types.length === 0 || filters.types.includes(v?.type?.name ?? '');
        const nation =
            !filters.nations || filters.nations.length === 0 || filters.nations.includes(v?.nation?.name ?? '');
        const tier = !filters.tiers || filters.tiers.length === 0 || filters.tiers.includes(v?.level?.toString() ?? '');
        return type && nation && tier;
    });
    return { data: fitlered, error: null };
};

export const getShipsPaginated = ({ ships, limit, offset }: { ships: Vehicles; limit: number; offset: number }) => {
    if (!ships) {
        return { data: null, error: { message: 'Unknown error retrieving ships' } };
    }
    const slice = ships.slice(offset, offset + limit);
    return { data: slice, error: null };
};
