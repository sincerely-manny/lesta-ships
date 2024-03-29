import { FilterX } from 'lucide-react';
import { useEffect, type Dispatch, type SetStateAction, useState } from 'react';

type ResetTagsProps = {
    setters: Dispatch<SetStateAction<string[]>>[];
    applyFilters: () => void;
    show: boolean;
};

export default function ResetTags({ setters, applyFilters, show }: ResetTagsProps) {
    const [trigger, setTrigger] = useState(false);
    const resetFilters = () => {
        for (const set of setters) {
            set([]);
            setTrigger(true);
        }
    };
    useEffect(() => {
        if (trigger) {
            applyFilters();
            setTrigger(false);
        }
    }, [applyFilters, trigger]);
    return show ? (
        <button onClick={resetFilters} type="button">
            <FilterX size={13} className="inline" />{' '}
            <span className="underline decoration-dashed underline-offset-4">Очистить&nbsp;</span>
        </button>
    ) : null;
}
