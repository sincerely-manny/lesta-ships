import Skeleton from '@/components/ui/skeleton';
import Bg from './Bg';

export default function CardSkeleton() {
    return (
        <li className="group relative grid aspect-[16/9] transition-shadow">
            <Bg className=" absolute aspect-[16/9] object-fill opacity-30" color="#FFFFFF" />
            <div className="p-4 opacity-70">
                <div className="flex w-full items-start justify-between text-base">
                    <div className="font-semibold">
                        <Skeleton className="mb-3 h-6 w-32" />
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-6 w-12" />
                        </div>
                    </div>
                    <div className="text-right">
                        <Skeleton className="h-8 w-28" />
                    </div>
                </div>
            </div>
        </li>
    );
}
