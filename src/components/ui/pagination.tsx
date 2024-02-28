import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/styles';
import { type ButtonProps, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            className={cn('mx-auto flex w-full justify-center', className)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        />
    );
}
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
    ({ className, ...props }, ref) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
    ),
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
    React.ComponentProps<'a'>;

function PaginationLink({
    className,
    isActive = false,
    size = 'icon',
    children = null,
    href,
    onClick,
}: PaginationLinkProps) {
    const Element = href ? Link : 'span';
    return (
        <Element
            href={href ?? ''}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
                buttonVariants({
                    variant: isActive ? 'outline' : 'ghost',
                    size,
                }),
                className,
                'border-secondary-2 cursor-pointer opacity-70 transition-colors hover:opacity-90 aria-[current=page]:pointer-events-none',
            )}
            onClick={onClick}
        >
            {children}
        </Element>
    );
}
PaginationLink.displayName = 'PaginationLink';

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="Предыдущая страница"
            size="default"
            className={cn('gap-1 pl-2.5', className)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Предыдущая страница</span>
        </PaginationLink>
    );
}
PaginationPrevious.displayName = 'PaginationPrevious';

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="Следующая страница"
            size="default"
            className={cn('gap-1 pr-2.5', className)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Следующая страница</span>
        </PaginationLink>
    );
}
PaginationNext.displayName = 'PaginationNext';

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center opacity-70', className)} {...props}>
            <MoreHorizontal className="h-4 w-4" />
            {/* <span className="sr-only">More pages</span> */}
        </span>
    );
}
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
