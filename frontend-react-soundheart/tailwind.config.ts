import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

/**
 * SoundHeart design system — mapped 1:1 from the approved HTML design
 * (see ../design-source/DESIGN-REFERENCE.md). Brand tokens are exposed both
 * as semantic shadcn variables and as direct `brand-*` colors so components
 * can port the original CSS faithfully.
 */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '28px',
      screens: {
        '2xl': '1120px', // --maxw from the original design
      },
    },
    extend: {
      colors: {
        // Direct brand palette (exact hex from the design :root)
        navy: {
          DEFAULT: '#1F3D2E',
          deep: '#15301F',
        },
        gold: {
          DEFAULT: '#B8964F',
          bright: '#C9A961',
        },
        ivory: '#FAF6EE',
        stone: '#EAE1CD',
        ink: '#33383F',

        // shadcn semantic tokens (driven by CSS vars in index.css)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      fontFamily: {
        serif: ['Spectral', 'Georgia', 'serif'],
        sans: ['Mulish', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // original used 2px on buttons, 6px on cards
        btn: '2px',
        card: '6px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      maxWidth: {
        wrap: '1120px',
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      keyframes: {
        draw: {
          to: { strokeDashoffset: '0' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        draw: 'draw 2.6s ease forwards 0.25s',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
} satisfies Config
