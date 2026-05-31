import { Box, Container, useMediaQuery, useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { ServerStatusBanner } from '@/components/common/ServerStatusBanner'

export function AppLayout() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <ServerStatusBanner />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ flexGrow: 1, py: { xs: 2, md: 4 } }}
      >
        <Outlet />
      </Container>
      {!isDesktop && <BottomNav />}
    </Box>
  )
}
