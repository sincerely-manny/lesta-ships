import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import roman from '@/lib/levels';
import { Info } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';
import { type ShipData } from '..';
import getShipById from './data/ship';

export type TtcData = {
    description?: string;
    name?: string;
    title?: string;
    unit?: string;
    value?: number;
};

export default async function Details({ data: { imageLarge, nation, title, level, type, id } }: { data: ShipData }) {
    const shipDetails = (await getShipById(id))?.data?.vehicles?.[0];
    const description = (shipDetails?.description as string) ?? '';
    const ttc = (shipDetails?.ttc as TtcData[]) ?? [];
    return (
        <div className="relative grid grid-cols-1 items-center gap-20 xl:grid-cols-2">
            <div className="aspect-[16/9] w-full max-w-[600px] xl:max-w-max">
                <div className="absolute left-0 top-0 z-10">
                    <h2 className="flex items-center gap-2 text-3xl font-bold">
                        <Image src={type.icon} alt={type.title} width={50} height={50} />
                        {title}
                    </h2>
                    <p className="text-xl">
                        {nation.title} • {type.title} • Уровень {roman(level)}
                    </p>
                </div>
                <div className="absolute inset-0">
                    <Image
                        src={nation.icon}
                        alt={nation.title}
                        width={700}
                        height={700}
                        className="h-auto max-w-full object-cover opacity-10"
                    />
                </div>
                <div className="relative">
                    <Image
                        src={imageLarge}
                        alt={title}
                        width={800}
                        height={800}
                        className="h-auto max-w-full object-cover opacity-100"
                    />
                </div>
            </div>
            <div className="relative z-10 font-light">
                <h3 className="mb-5 text-2xl font-medium">Описание</h3>
                <p>{description}</p>
                <h3 className="mb-5 mt-10 text-2xl font-medium">Характеристики</h3>
                <div className="grid grid-cols-[2rem_8rem_2.5rem_10rem] items-center">
                    {ttc.map((t) => (
                        <Fragment key={t.name}>
                            {t.description ? (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info size={18} className="text-primary/70 hover:text-primary" />
                                            <span className="sr-only">{t.description}</span>
                                        </TooltipTrigger>
                                        <TooltipContent side="left">
                                            <p>{t.description}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <div />
                            )}
                            <span>{t.title}</span>

                            <span className="relative z-10 p-2 text-sm font-medium">
                                {t.value} {t.unit}
                            </span>
                            <div
                                className="bg-primary/10 outline-primary/30  relative h-3 overflow-hidden rounded  outline outline-1 -outline-offset-1"
                                style={{ width: `${t.value}%` }}
                            >
                                <div className="from-secondary-1/50 absolute inset-0 w-[10rem] bg-gradient-to-l via-60% to-transparent" />
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
