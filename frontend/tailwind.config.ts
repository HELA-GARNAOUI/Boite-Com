import type { Config } from "tailwindcss";
import { colors } from "./lib/colors";

const config: Config = {
    darkMode: ["class"],
    content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
  		colors: {
  			border: "hsl(var(--border))",
  			input: "hsl(var(--input))",
  			ring: "hsl(var(--ring))",
  			background: "hsl(var(--background))",
  			foreground: "hsl(var(--foreground))",
  			primary: {
  				DEFAULT: colors.primary[600],
  				foreground: colors.primary[50],
  				...colors.primary,
  			},
  			secondary: {
  				DEFAULT: colors.secondary[600],
  				foreground: colors.secondary[50],
  				...colors.secondary,
  			},
  			accent: {
  				DEFAULT: colors.accent[500],
  				foreground: colors.accent[50],
  				...colors.accent,
  			},
  			destructive: {
  				DEFAULT: colors.error[600],
  				foreground: colors.error[50],
  			},
  			muted: {
  				DEFAULT: colors.neutral[200],
  				foreground: colors.neutral[700],
  			},
  			card: {
  				DEFAULT: "hsl(var(--card))",
  				foreground: "hsl(var(--card-foreground))",
  			},
  			popover: {
  				DEFAULT: "hsl(var(--popover))",
  				foreground: "hsl(var(--popover-foreground))",
  			},
  			success: {
  				DEFAULT: colors.success[500],
  				foreground: colors.success[50],
  			},
  			warning: {
  				DEFAULT: colors.warning[500],
  				foreground: colors.warning[50],
  			},
  			error: {
  				DEFAULT: colors.error[500],
  				foreground: colors.error[50],
  			},
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)",
  		},
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
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
