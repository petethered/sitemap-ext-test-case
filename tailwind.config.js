module.exports = {
  content: ["./src/**/*.{astro,js,jsx,ts,tsx}"],
  
  theme: {
    fontFamily: {
        sans: [
            '"Noto Sans"',
            'Inter',
            'ui-sans-serif',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ],
        serif: [
            'ui-serif',
            'Georgia',
            'Cambria',
            '"Times New Roman"',
            'Times',
            'serif',
        ],
        mono: [
            'ui-monospace',
            'SFMono-Regular',
            'Menlo',
            'Monaco',
            'Consolas',
            '"Liberation Mono"',
            '"Courier New"',
            'monospace',
        ],
    },
    screens: {
        xs: '576',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px',
    },
    extend: {
        padding: {
            '70px': '70px',
            '80px': '80px',
        },
        spacing: {
            '70px': '70px',
            '80px': '80px',
        },
        height: {
            '70px': '70px',
            '80px': '80px',
        },
        colors: {
            'purple': '#251040',
            'lightpurple' : '463060',
            'pink': '#462f60',
            'cherry': '#A055DD',
            'dark': '#251040',
            'light': '#462f60',
            'active': '#A055DD',
        },
        typography: (theme) => ({
            DEFAULT: {
                css: {
                    color: theme('colors.gray.500'),
                    maxWidth: '65ch',
                },
            },
            invert: {
                css: {
                    color: theme('colors.gray.400'),
                },
            },
        }),
    },
},
  plugins: [require("daisyui")],
};
