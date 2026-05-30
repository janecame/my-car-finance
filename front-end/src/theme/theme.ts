import { createTheme, type Theme } from '@mui/material/styles'
import type { ThemeMode } from '@/theme/useThemeStore'

// Google-inspired palette (Material You-ish): Google blue + green accents,
// rounded surfaces, gentle elevation.
const GOOGLE_BLUE = '#1a73e8'
const GOOGLE_GREEN = '#1e8e3e'
const GOOGLE_RED = '#d93025'
const GOOGLE_YELLOW = '#f9ab00'

const fontFamily = [
  'Roboto',
  'system-ui',
  '"Segoe UI"',
  'Arial',
  'sans-serif',
].join(',')

export function buildTheme(mode: ThemeMode): Theme {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: { main: isDark ? '#8ab4f8' : GOOGLE_BLUE },
      secondary: { main: isDark ? '#81c995' : GOOGLE_GREEN },
      success: { main: GOOGLE_GREEN },
      error: { main: GOOGLE_RED },
      warning: { main: GOOGLE_YELLOW },
      background: {
        default: isDark ? '#202124' : '#f8f9fa',
        paper: isDark ? '#2a2b2e' : '#ffffff',
      },
      divider: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily,
      h4: { fontWeight: 500, letterSpacing: '-0.5px' },
      h5: { fontWeight: 500 },
      h6: { fontWeight: 500 },
      button: { textTransform: 'none', fontWeight: 500 },
    },
    components: {
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 16,
          }),
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: 999 } },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: 'default' },
        styleOverrides: {
          root: ({ theme }) => ({
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }),
        },
      },
      MuiLinearProgress: {
        styleOverrides: { root: { borderRadius: 999, height: 12 } },
      },
    },
  })
}
