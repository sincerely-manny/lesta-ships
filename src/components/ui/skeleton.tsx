import { cn } from '@/lib/styles';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <div className={cn('animate-pulse rounded-md bg-white/30', className)} {...props} />;
}

export default Skeleton;
