module.exports = {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                brand: {
                    300: '#996DDF',
                    500: '#8257e6' // Quantas cores quiser para usar no Tailwind
                }
            },
            borderRadius: {
                md: '4px'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar'),
    ],
}
