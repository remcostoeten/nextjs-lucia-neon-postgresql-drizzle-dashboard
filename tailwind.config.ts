import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      height: {
        search: "40px",
        header: "77px",
      },
      maxWidth: {
        search: "var(--search-width)",
      },
      colors: {
        // custom colors
        /* Background Colors */
        destructive: "var(--destructive)",
        body: "var(--bg-body)",
        card: "var(--bg-card)",
        brand: "var(--brand)",
        avatar: "var(--avatar)",
        "bg-section": "var(--bg-section)",
        "section-lighter": "var(--bg-section-lighter)",
        "bg-input": "var(--bg-input)",
        "bg-dropdown": "var(--bg-dropdown)",
        modal: "var(--bg-modal)",
        "modal-hover": "var(--bg-modal-hover)",

        /* Border & Outline Colors */
        "border-default": "var(--border-default)",
        "border-outline": "var(--border-outline)",
        "border-separator": "var(--border-separator)",

        /* Text Colors */
        title: "var(--text-title)",
        subtitle: "var(--text-subtitle)",
        "text-muted": "var(--text-muted)",
        "text-regular-nav": "var(--text-regular-nav)",
        "text-button": "var(--text-button)",
        "text-button-alt": "var(--text-button-alt)",
        "text-dropdown-item": "var(--text-dropdown-item)",

        /* Button Colors */
        "button-default": "var(--button-default)",
        "button-hover": "var(--button-hover)",

        /* Miscellaneous Colors */
        success: "var(--color-success)",
        error: "var(--color-error)",
        "menu-icon": "var(--color-menu-icon)",
        placeholder: "var(--color-placeholder)",
        "input-focus": "var(--color-input-focus)",

        /* Badge Colors */
        "badge-default": "var(--badge-default)",
        "badge-hover": "var(--badge-hover)",

        // shadcn colors
        border: "var(--border-default)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--bg-section)",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "var(--text-regular-nav)",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "var(--bg-dropdown)",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "var(--bg-card)",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%", transform: "scale(1)" },
          "50%": { backgroundPosition: "100% 50%", transform: "scale(1.1)" },
        },
        opacityPulse: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // banner variants
        slideInFromTop: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInFromBottom: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInFromLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInFromRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        zoomIn95: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        zoomOut95: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
      },
      animation: {
        "gradient-move": "gradientMove 15s ease infinite",
        "opacity-pulse": "opacityPulse 15s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-from-bottom": "slideInFromBottom 0.5s ease-out",
        "slide-in-from-left": "slideInFromLeft 0.5s ease-out",
        "slide-in-from-right": "slideInFromRight 0.5s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-out": "fadeOut 0.3s ease-in",
        "zoom-in-95": "zoomIn95 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "zoom-out-95": "zoomOut95 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: string) => ({
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='${value}'><path d='M0 .5H31.5V32'/></svg>")`,
          }),
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: "color",
        },
      );
    },
    addVariablesForColors,
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );
  addBase({
    ":root": newVars,
  });
}

export default config;
