import ShipsList from '@/components/page/home/ShipsList';
import ShipsListSkeleton from '@/components/page/home/ShipsList/Skeleton';
import { Suspense } from 'react';

function getParamArray(params: Record<string, string | string[] | undefined>, key: string) {
    if (!params?.[key] || Array.isArray(params[key])) {
        return undefined;
    }
    return (params[key] as string)?.split(',');
}

export default function HomePage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
    const page = searchParams?.page && !Array.isArray(searchParams.page) ? parseInt(searchParams.page, 10) : 1;
    const [types, nations, tiers] = ['types', 'nations', 'tiers'].map((k) => getParamArray(searchParams, k));
    return (
        <main className="flex w-full flex-col items-center justify-start ">
            <Suspense fallback={<ShipsListSkeleton limit={24} />}>
                <ShipsList limit={24} page={page} filters={{ types, nations, tiers }} />
            </Suspense>
        </main>
    );
}
