/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        sidebar: 'var(--sidebar)',
        border: 'var(--border)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        'gcse-accent': 'var(--gcse-accent)',
        'gcse-accent-light': 'var(--gcse-accent-light)',
        'ib-accent': 'var(--ib-accent)',
        'ib-accent-light': 'var(--ib-accent-light)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        'band-1': 'var(--band-1)',
        'band-2': 'var(--band-2)',
        'band-3': 'var(--band-3)',
        'band-4': 'var(--band-4)',
      },
    },
  },
  plugins: [],
}
