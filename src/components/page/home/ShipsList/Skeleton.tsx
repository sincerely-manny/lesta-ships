import Skeleton from '@/components/ui/skeleton';
import CardSkeleton from './Card/Skeleton';

type ShipsListSkeletonProps = {
    limit?: number;
};

export default function ShipsListSkeleton({ limit = 24 }: ShipsListSkeletonProps) {
    return (
        <section className="flex w-full flex-col gap-10">
            <Skeleton className="h-10 w-1/3 self-start" />
            <ul className="grid w-full  gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-6">
                {Array.from({ length: limit }, (_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </ul>
        </section>
    );
}
