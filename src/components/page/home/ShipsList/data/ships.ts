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
    search?: string;
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
        const title =
            !filters.search ||
            filters.search.length === 0 ||
            (v?.title as string).toUpperCase().includes(filters.search.toUpperCase());
        return type && nation && tier && title;
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

export const sortShips = (data: Vehicles, sortBy = 'tier') => {
    if (!data) {
        return {
            data: null,
            error: { message: 'Unknown error sorting ships' },
        };
    }

    const compare = <T extends string | number>(a: T, b: T) => {
        if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
        }
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        return 0;
    };

    const sorted = data.sort((ship1, ship2) => {
        const [level1, level2, type1, type2, nation1, nation2, name1, name2] = [
            ship1?.level ?? 0,
            ship2?.level ?? 0,
            (ship1?.type?.title as string) ?? '',
            (ship2?.type?.title as string) ?? '',
            (ship1?.nation?.title as string) ?? '',
            (ship2?.nation?.title as string) ?? '',
            (ship1?.title as string) ?? '',
            (ship2?.title as string) ?? '',
        ];
        switch (sortBy) {
            case 'tier':
                return (
                    compare(level1, level2) ||
                    compare(type1, type2) ||
                    compare(nation1, nation2) ||
                    compare(name1, name2)
                );
            case 'type':
                return (
                    compare(type1, type2) ||
                    compare(level1, level2) ||
                    compare(nation1, nation2) ||
                    compare(name1, name2)
                );
            case 'nation':
                return (
                    compare(nation1, nation2) ||
                    compare(level1, level2) ||
                    compare(type1, type2) ||
                    compare(name1, name2)
                );
            case 'name':
                return (
                    compare(name1, name2) ||
                    compare(level1, level2) ||
                    compare(type1, type2) ||
                    compare(nation1, nation2)
                );
            case 'default':
            default:
                return 0;
        }
    });
    return { data: sorted, error: null };
};
