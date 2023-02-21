/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#094067",
                secondary: "#90B4CE",
                tertiary: "#EF4565",
                button: "#3DA9FC",
                paragraph: "#5F6C7B",
            },
        },
    },
    plugins: [],
};
