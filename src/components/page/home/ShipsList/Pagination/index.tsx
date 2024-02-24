'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import throttle from 'lodash.throttle';
import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ShipsListPaginationProps = { limit: number; page: number; total: number; className?: string };

export default function ShipsListPagination({ limit, page, total, className = '' }: ShipsListPaginationProps) {
    const [loading, setLoading] = useState<undefined | number>(undefined);
    const [sticky, setSticky] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setStickyThrottled = useCallback(throttle(setSticky, 10), []);
    const spacerDiv = useRef<HTMLDivElement>(null);
    useEffect(() => {
        window.addEventListener(
            'scroll',
            () => {
                setStickyThrottled((spacerDiv.current?.getBoundingClientRect().bottom ?? 0) - window.innerHeight <= 0);
            },
            { passive: true },
        );
    });
    useEffect(() => {
        setSticky((spacerDiv.current?.getBoundingClientRect().bottom ?? 0) - window.innerHeight <= 0);
    }, []);

    return (
        <>
            <div className="h-40" ref={spacerDiv} />
            <div
                className={twMerge(
                    'pointer-events-none fixed bottom-0 z-10 flex h-40 items-center justify-center transition-opacity duration-300 hover:opacity-100',
                    sticky ? 'relative -translate-y-full opacity-100' : 'fixed translate-y-0 opacity-80',
                    className,
                )}
            >
                <Pagination className="bg-secondary-2/20 outline-secondary-2 pointer-events-auto rounded-full p-2 outline outline-1 backdrop-blur-lg">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={page !== 1 ? `/?page=${page - 1}` : undefined}
                                onClick={() => setLoading(page - 1)}
                            />
                        </PaginationItem>
                        {new Array(Math.ceil(total / limit)).fill(null).map((_, i) => (
                            <PaginationItem key={Math.random()}>
                                <PaginationLink
                                    href={`/?page=${i + 1}`}
                                    isActive={i + 1 === page}
                                    onClick={() => setLoading(i + 1)}
                                >
                                    {loading === i + 1 ? <Loader2 size={16} className="animate-spin" /> : i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href={page !== Math.ceil(total / limit) ? `/?page=${page + 1}` : undefined}
                                onClick={() => setLoading(page + 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
}
