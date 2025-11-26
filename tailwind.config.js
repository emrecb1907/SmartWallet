/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                background: "#0F0F0F",
                primary: "#FFFFFF",
                secondary: "#A3A3A3",
                accent: "#3B82F6",
                "graph-highlight": "#60A5FA",
                card: "#1C1C1C",
                border: "#262626",
                success: "#22C55E",
                warning: "#FACC15",
                danger: "#EF4444",
            },
        },
    },
    plugins: [],
}
