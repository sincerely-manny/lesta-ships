import ShipsListSkeleton from '@/components/page/home/ShipsList/Skeleton';

export default function Loading() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-start ">
            <ShipsListSkeleton limit={24} />
        </main>
    );
}
