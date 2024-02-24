import roman from '@/lib/levels';
import Image from 'next/image';
import Link from 'next/link';
import Bg from './Bg';
import glow from './images/glow.svg';

type ShipTypeData = {
    title: string;
    icon: string;
};

type ShipNationData = {
    title: string;
    icon: string;
    color: string;
};

type ShipData = {
    id: string;
    title: string;
    level: string | number;
    image: string;
    type: ShipTypeData;
    nation: ShipNationData;
};

export default function Card({ data: { id, image, title, level, type, nation } }: { data: ShipData }) {
    return (
        <li className="group relative grid aspect-[16/9] rounded-[16px] transition-all duration-700 [grid-template-areas:stack]">
            <Link className="absolute inset-0 z-10" href={`/ship/${id}`}>
                <span className="sr-only">Подробнее</span>
            </Link>
            <div className="w-[90%] place-self-center [grid-area:stack]" aria-hidden>
                <Image
                    src={nation.icon}
                    alt={title}
                    className="h-auto max-w-full object-cover opacity-10 transition-opacity duration-500 group-hover:opacity-20"
                    width={400}
                    height={300}
                />
            </div>
            <div
                className="relative overflow-hidden rounded-2xl transition-opacity duration-300 [grid-area:stack]"
                aria-hidden
            >
                <Image
                    src={(glow as { src: string }).src}
                    alt="glow"
                    className="object-fit translate-y-1/3 opacity-10 transition-opacity duration-300 group-hover:opacity-50"
                    fill
                    sizes="100vw"
                />
            </div>
            <Bg
                className="aspect-[16/9] overflow-hidden object-fill opacity-30 transition-opacity [grid-area:stack] group-hover:opacity-50"
                color={nation.color}
            />
            <div className="relative w-[90%] place-self-center opacity-80 [grid-area:stack]">
                <Image
                    src={image}
                    alt={title}
                    className="object-fit h-auto max-w-full"
                    width={400}
                    height={300}
                    key={id}
                />
            </div>

            <div className="flex flex-1 flex-col gap-1 p-4 [grid-area:stack]">
                <h3 className="flex items-center justify-between gap-2 align-middle text-base font-semibold">
                    <span className="opacity-90">{title}</span>
                    <div className="relative size-8 opacity-60">
                        <Image src={type.icon} alt={type.title} fill sizes="100vw" />
                    </div>
                </h3>
                <p className="text-xs font-light opacity-70">
                    {type.title} – Уровень {roman(level)}
                </p>
                <p className="text-xs font-light opacity-70">{nation.title}</p>
            </div>
        </li>
    );
}
