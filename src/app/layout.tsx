import '@/styles/globals.css';
import { type Viewport } from 'next';

import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata = {
    title: 'Warships Showcase',
    description: "Lesta's ships of World of Warships",
    icons: [
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            url: '/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/favicon-16x16.png',
        },
        {
            rel: 'manifest',
            url: '/site.webmanifest',
        },
        {
            rel: 'mask-icon',
            url: '/safari-pinned-tab.svg',
            color: '#17293b',
        },
    ],
    manifest: '/site.webmanifest',
    applicationName: 'Warships Showcase',
    appleWebApp: {
        capable: true,
        title: 'Warships Showcase',
        statusBarStyle: 'black-translucent',
    },
};

export const viewport: Viewport = {
    themeColor: '#17293b',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`font-sans ${inter.variable} text-while min-h-screen`}>{children}</body>
        </html>
    );
}
