import ShipsList from '@/components/page/home/ShipsList';
import { Suspense } from 'react';

export default function HomePage() {
    return (
        <main className="from-primary flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br to-black text-white">
            <div className="">
                <h1>111</h1>
                <Suspense fallback={<div>Loading ships...</div>}>
                    <ShipsList />
                </Suspense>
            </div>
        </main>
    );
}
