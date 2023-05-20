/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{ts,tsx}", "./node_modules/flowbite-react/**/*.js"],
    theme: {
        extend: {
            colors: {
                primary: "#094067",
                secondary: "#90B4CE",
                tertiary: "#EF4565",
                cta: "#3DA9FC",
                paragraph: "#5F6C7B",
                background: "#FFFFFE",
            },
        },
    },
    plugins: [
        require("flowbite/plugin"),
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("tailwind-scrollbar")({ nocompatible: true }),
    ],
};
