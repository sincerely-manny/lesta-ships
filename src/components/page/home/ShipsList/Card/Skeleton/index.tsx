import Skeleton from '@/components/ui/skeleton';
import Bg from '../Bg';

export default function Card() {
    return (
        <li className="group relative grid aspect-[16/9] rounded-lg outline-white [grid-template-areas:stack]">
            <div className="aspect-[16/9] h-full w-full [grid-area:stack]">
                <Bg className="object-fill opacity-30" color="#FFFFFF" />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4 [grid-area:stack]">
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
