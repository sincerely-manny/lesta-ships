import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';
import { useState, type Dispatch, type SetStateAction, useEffect, useCallback, type ChangeEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

type TextSearchProps = {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    applyFilters: () => void;
    className?: string;
};

export default function TextSearch({ value, setValue, applyFilters, className = '' }: TextSearchProps) {
    const [trigger, setTrigger] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setTriggerDebounced = useCallback(debounce(setTrigger, 500), []);
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
        setTriggerDebounced(true);
    };
    useEffect(() => {
        if (trigger) {
            applyFilters();
            setTrigger(false);
        }
    }, [trigger, applyFilters]);
    return (
        <div className={twMerge('relative', className)}>
            <input
                type="text"
                placeholder="Поиск по названию"
                className="focus-visible:ring-primary ring-offset-secondary-1 bg-secondary-2/20 outline-primary/40  hover:outline-primary/60 h-9 w-full rounded-md px-3 text-sm font-medium text-white outline outline-1 transition-colors placeholder:font-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 md:w-64"
                value={value}
                onChange={handleChange}
            />
            <button
                type="button"
                onClick={applyFilters}
                className="absolute right-2 top-1/2 flex -translate-y-1/2 place-items-center opacity-50 hover:opacity-100"
            >
                <Search />
                <span className="sr-only">Найти</span>
            </button>
        </div>
    );
}
