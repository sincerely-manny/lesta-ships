import ShipsList from '@/components/page/home/ShipsList';
import ShipsListSkeleton from '@/components/page/home/ShipsList/Skeleton';
import { Suspense } from 'react';

export default function HomePage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
    const page = searchParams?.page && !Array.isArray(searchParams.page) ? parseInt(searchParams.page, 10) : 1;
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center ">
            <Suspense fallback={<ShipsListSkeleton limit={24} />}>
                <ShipsList limit={24} page={page} />
            </Suspense>
        </main>
    );
}
