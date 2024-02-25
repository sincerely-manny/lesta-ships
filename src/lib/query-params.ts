import { useSearchParams } from 'next/navigation';

function useQueryParams() {
    const searchParams = useSearchParams();
    const set = (key: string, value: string | number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, String(value));
        return params.toString();
    };
    const remove = (key: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);
        return params.toString();
    };
    return { ...searchParams, params: searchParams, remove, set };
}

export default useQueryParams;
