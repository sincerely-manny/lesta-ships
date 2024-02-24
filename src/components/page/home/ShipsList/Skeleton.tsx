import CardSkeleton from './Card/Skeleton';

type ShipsListSkeletonProps = {
    limit?: number;
};

export default function ShipsListSkeleton({ limit = 24 }: ShipsListSkeletonProps) {
    return (
        <ul className="grid items-stretch gap-3 transition-all md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-6">
            {Array.from({ length: limit }, (_, i) => (
                <CardSkeleton key={i} />
            ))}
        </ul>
    );
}
