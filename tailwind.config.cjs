/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "./node_modules/flowbite-react/**/*.js",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            colors: {
                primary: "#094067",
                secondary: "#90B4CE",
                tertiary: "#EF4565",
                cta: "#3DA9FC",
                paragraph: "#5F6C7B",
                background: "#FFFFFE",
                opac: "rgba(0, 0, 0, 0.2)",
            },
        },
    },
    plugins: [
        require("flowbite/plugin"),
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("tailwind-scrollbar")({ nocompatible: true }),
        require("tailwindcss-animate"),
    ],
};
