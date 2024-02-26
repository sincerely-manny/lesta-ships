import debounce from 'lodash.debounce';
import { useState, type Dispatch, type SetStateAction, useEffect, useCallback, type ChangeEventHandler } from 'react';

type TextSearchProps = {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    applyFilters: () => void;
};

export default function TextSearch({ value, setValue, applyFilters }: TextSearchProps) {
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
        <input
            type="text"
            placeholder="Название"
            className="focus-visible:ring-primary ring-offset-secondary-1 bg-secondary-2/20 outline-primary/40 hover:bg-secondary-2/40 hover:outline-primary/60 h-9 w-full rounded-md px-3 text-sm font-medium text-white outline outline-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:w-72"
            value={value}
            onChange={handleChange}
        />
    );
}
