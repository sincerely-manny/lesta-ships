import { type PropsWithChildren } from 'react';
import { MinusCircle } from 'lucide-react';

export default function Tag({
    children,
    action,
    color = undefined,
}: PropsWithChildren & { action: () => void; color?: string }) {
    return (
        <div
            className="ring-primary/30 bg-secondary-1/10 from-primary/20 to-secondary-1/20 flex  cursor-default items-center gap-1 rounded bg-gradient-to-r p-1 opacity-70 ring-1 ring-inset transition-opacity hover:opacity-90"
            style={color ? { backgroundColor: `${color}20` } : {}}
        >
            <button type="button" onClick={action}>
                <MinusCircle size={13} strokeWidth={1} stroke="#FFF" />
                <span className="sr-only">Удалить</span>
            </button>
            <span>{children}</span>
        </div>
    );
}
