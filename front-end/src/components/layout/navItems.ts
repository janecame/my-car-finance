import DashboardIcon from '@mui/icons-material/SpaceDashboardOutlined'
import ReceiptIcon from '@mui/icons-material/ReceiptLongOutlined'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCarFilledOutlined'
import NotificationsIcon from '@mui/icons-material/NotificationsActiveOutlined'
import type { SvgIconComponent } from '@mui/icons-material'

export interface NavItem {
  label: string
  to: string
  icon: SvgIconComponent
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/', icon: DashboardIcon },
  { label: 'Bills', to: '/bills', icon: ReceiptIcon },
  { label: 'inDrive', to: '/finance', icon: DirectionsCarIcon },
  { label: 'Reminders', to: '/reminders', icon: NotificationsIcon },
]
