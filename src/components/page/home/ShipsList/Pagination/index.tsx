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

function generatePageLinks(currentPage: number, totalPages: number): number[] {
    const links: number[] = [];
    links.push(1);
    if (currentPage > 4) {
        links.push(-1);
    }
    for (let i = Math.max(2, currentPage - 2); i <= Math.min(currentPage + 2, totalPages - 1); i++) {
        links.push(i);
    }
    if (currentPage < totalPages - 3) {
        links.push(-2);
    }
    links.push(totalPages);

    return links;
}

type ShipsListPaginationProps = { limit: number; page: number; total: number; className?: string };

export default function ShipsListPagination({ limit, page, total, className = '' }: ShipsListPaginationProps) {
    const totalPages = Math.ceil(total / limit);
    const links = generatePageLinks(page, totalPages);
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
                        {links.map((p) =>
                            p > 0 ? (
                                <PaginationItem
                                    key={p}
                                    className={
                                        (page > 3 && p === 1) || (page < totalPages - 2 && p === totalPages)
                                            ? 'hidden sm:inline-block'
                                            : ''
                                    }
                                >
                                    <PaginationLink
                                        href={`/?page=${p}`}
                                        isActive={p === page}
                                        onClick={() => setLoading(p)}
                                    >
                                        {loading === p ? <Loader2 size={16} className="animate-spin" /> : p}
                                    </PaginationLink>
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={p} className="hidden sm:inline-block">
                                    <PaginationEllipsis />
                                </PaginationItem>
                            ),
                        )}
                        <PaginationItem>
                            <PaginationNext
                                href={page !== totalPages ? `/?page=${page + 1}` : undefined}
                                onClick={() => setLoading(page + 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
}
