
import type { Config } from "tailwindcss";

export default {
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				demixer: {
					dark: '#1A1F2C',
					darker: '#15181F',
					accent: '#9b87f5',
					'accent-hover': '#8a74f9',
					neon: '#1EAEDB',
					'neon-hover': '#0D9DC8',
					charcoal: '#403E43',
					'charcoal-dark': '#221F26',
					overlay: '#000000e6',
					light: '#fff'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-wave': {
					'0%, 100%': {
						transform: 'scaleY(1)'
					},
					'50%': {
						transform: 'scaleY(1.5)'
					}
				},
				'rotate-center': {
					'0%': {
						transform: 'rotate(0)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'waveform': {
					'0%, 100%': {
						'clip-path': 'polygon(0 40%, 5% 45%, 10% 55%, 15% 57%, 20% 45%, 25% 35%, 30% 45%, 35% 60%, 40% 55%, 45% 45%, 50% 40%, 55% 45%, 60% 55%, 65% 60%, 70% 45%, 75% 35%, 80% 50%, 85% 60%, 90% 55%, 95% 45%, 100% 40%, 100% 100%, 0 100%)'
					},
					'50%': {
						'clip-path': 'polygon(0 50%, 5% 55%, 10% 45%, 15% 37%, 20% 55%, 25% 65%, 30% 55%, 35% 40%, 40% 45%, 45% 55%, 50% 60%, 55% 55%, 60% 45%, 65% 40%, 70% 55%, 75% 65%, 80% 40%, 85% 30%, 90% 45%, 95% 55%, 100% 50%, 100% 100%, 0 100%)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-wave': 'pulse-wave 1.5s ease-in-out infinite',
				'rotate-center': 'rotate-center 8s linear infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'waveform': 'waveform 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
