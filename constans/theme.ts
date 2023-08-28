const SIZES = {
  xs: 10,
  sm: 12,
  md: 16,
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
  gray_700: '#374151',
} as const;

export { SIZES, FONTS, COLORS };
