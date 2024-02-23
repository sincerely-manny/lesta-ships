import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';
// import { type PluginAPI } from 'tailwindcss/types/config';

export default {
    content: ['./src/**/*.tsx'],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: '#F2EFF1',
            black: '#17181C',
            primary: '#17293B',
            secondary: {
                1: '#5FA3BD',
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
        },
    },
    plugins: [typography],
} satisfies Config;
