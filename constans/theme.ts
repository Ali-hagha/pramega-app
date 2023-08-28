const SIZES = {
  xxxxs: 4,
  xxxs: 6,
  xxs: 8,
  xs: 10,
  sm: 12,
  smp: 14,
  md: 16,
  mdp: 18,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

const FONTS = {
  Montserrat_100: 'Montserrat_100',
  Montserrat_200: 'Montserrat_200',
  Montserrat_300: 'Montserrat_300',
  Montserrat_400: 'Montserrat_400',
  Montserrat_500: 'Montserrat_500',
  Montserrat_600: 'Montserrat_600',
  Montserrat_700: 'Montserrat_700',
  Montserrat_800: 'Montserrat_800',
  Montserrat_900: 'Montserrat_900',
} as const;

const COLORS = {
  white: '#fff',
  gray_100: '#f3f4f6',
  gray_200: '#e5e7eb',
  gray_300: '#d1d5db',
  gray_400: '#9ca3af',
  gray_500: '#6b7280',
  gray_600: '#4b5563',
  gray_700: '#374151',
  gray_800: '#1f2937',
  gray_900: '#111827',
  amber_400: '#fbbf24',
} as const;

export { SIZES, FONTS, COLORS };
