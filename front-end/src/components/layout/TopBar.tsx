import { AppBar, Toolbar, Typography, Box, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled'
import { useLocation, useNavigate } from 'react-router-dom'
import { navItems } from '@/components/layout/navItems'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

export function TopBar() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const location = useLocation()
  const navigate = useNavigate()

  const activeIndex = Math.max(
    navItems.findIndex((n) =>
      n.to === '/' ? location.pathname === '/' : location.pathname.startsWith(n.to),
    ),
    0,
  )

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 1 }}>
        <DirectionsCarFilledIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          my-car-finance
        </Typography>

        {isDesktop && (
          <Tabs
            value={activeIndex}
            onChange={(_, i) => navigate(navItems[i].to)}
            sx={{ ml: 4, flexGrow: 1 }}
            textColor="primary"
            indicatorColor="primary"
          >
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Tab
                  key={item.to}
                  icon={<Icon fontSize="small" />}
                  iconPosition="start"
                  label={item.label}
                  sx={{ minHeight: 64 }}
                />
              )
            })}
          </Tabs>
        )}

        <Box sx={{ flexGrow: isDesktop ? 0 : 1 }} />
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  )
}
