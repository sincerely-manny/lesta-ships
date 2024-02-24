import Skeleton from '@/components/ui/skeleton';
import Bg from './Bg';

export default function CardSkeleton() {
    return (
        <li className="group relative grid aspect-[16/9] rounded-[16px] transition-shadow">
            <Bg className=" absolute aspect-[16/9] object-fill opacity-30" color="#FFFFFF" />
            <div className="flex flex-1 flex-col gap-1 p-4 opacity-70">
                <div className="flex h-8 items-center justify-between align-middle">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="mr-2 h-8 w-8" />
                </div>
                <Skeleton className="mb-1 mt-0.5 h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
            </div>
        </li>
    );
}
