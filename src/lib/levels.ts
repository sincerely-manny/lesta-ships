const levels = ['-', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

export default function roman(l: number | string) {
    const n = parseInt(l.toString(), 10);
    if (Number.isNaN(n) || n < 1 || n > 11) {
        return l.toString();
    }
    return levels[n];
}
