/** @type {import('tailwindcss').Config} */
import tailwindSafelistGenerator from "tailwind-safelist-generator";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./safelist.txt"],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindSafelistGenerator({
      path: "safelist.txt",
      patterns: [
        "text-red-600",
        "text-purple-600",
        "text-orange-600",
        "text-gray-600",
        "border-red-600",
        "border-purple-600",
        "border-orange-600",
        "border-gray-600",
        "size-6",
        "size-8",
      ],
    }),
  ],
};
