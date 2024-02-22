import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';
import { PluginAPI } from 'tailwindcss/types/config';

export default {
    content: ['./src/**/*.tsx'],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            while: '#F2EFF1',
            black: '#17181C',
            primary: '#17293B',
            secondary: {
                1: '#5FA3BD',
                2: '#6D7D8E',
            },
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', ...fontFamily.sans],
            },

            typography: (theme: PluginAPI['theme']) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.white'),
                        a: {
                            color: theme('colors.secondary.1'),
                            '&:hover': {
                                color: theme('colors.secondary.2'),
                            },
                        },
                    },
                },
            }),
        },
    },
    plugins: [typography],
} satisfies Config;
