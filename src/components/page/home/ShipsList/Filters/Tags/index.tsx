import { useEffect, type Dispatch, type SetStateAction, useState } from 'react';
import Tag from './Tag';

type TagsProps = {
    checked: { key: string; title: string; color?: string }[];
    setChecked: Dispatch<SetStateAction<string[]>>;
    applyFilters: () => void;
};

export default function Tags({ checked, setChecked, applyFilters }: TagsProps) {
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        // Should only trigger own changes
        if (trigger) {
            setTrigger(false);
            applyFilters();
        }
    }, [checked, applyFilters, trigger]);
    return (
        <>
            {checked.map(({ key, title, color }) => (
                <Tag
                    key={key}
                    action={() => {
                        setChecked((prev) => prev.filter((x) => x !== key));
                        setTrigger(true);
                    }}
                    color={color}
                >
                    {title}
                </Tag>
            ))}
        </>
    );
}
