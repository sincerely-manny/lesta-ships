import typography from '@tailwindcss/typography';
import { type Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import { fontFamily } from 'tailwindcss/defaultTheme';
// import { type PluginAPI } from 'tailwindcss/types/config';

export default {
    content: ['./src/**/*.tsx'],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: '#F2EFF1',
            black: '#17181C',
            primary: '#5FA3BD',
            secondary: {
                1: '#17293B',
                2: '#6D7D8E',
            },
            prose: {
                default: '#F2EFF1',
            },
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', ...fontFamily.sans],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [typography, tailwindcssAnimate],
} satisfies Config;
