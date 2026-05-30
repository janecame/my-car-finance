import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { navItems } from '@/components/layout/navItems'

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const value = Math.max(
    navItems.findIndex((n) =>
      n.to === '/' ? location.pathname === '/' : location.pathname.startsWith(n.to),
    ),
    0,
  )

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'sticky',
        bottom: 0,
        borderTop: 1,
        borderColor: 'divider',
        zIndex: (t) => t.zIndex.appBar,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, i) => navigate(navItems[i].to)}
      >
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <BottomNavigationAction key={item.to} label={item.label} icon={<Icon />} />
          )
        })}
      </BottomNavigation>
    </Paper>
  )
}
