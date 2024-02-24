'use client';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from '@/components/ui/pagination';

export default function ShipsListPagination({ limit, page, total }: { limit: number; page: number; total: number }) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>

                {/* <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem> */}
                {new Array(Math.ceil(total / limit)).fill(null).map((_, i) => (
                    <PaginationItem key={Math.random()}>
                        <PaginationLink href={`/?page=${i + 1}`} isActive={i + 1 === page}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
