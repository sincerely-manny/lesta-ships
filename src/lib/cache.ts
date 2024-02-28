import { unstable_cache } from 'next/cache';

type Callback = Parameters<typeof unstable_cache>[0];
const cache = <T extends Callback>(cb: T) =>
    unstable_cache<T>(cb, [], {
        tags: ['ships'],
        revalidate: 60 * 60 * 24, // 1 day
    });

export default cache;
