import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ReceiptIcon from '@mui/icons-material/ReceiptLong'
import type { SvgIconComponent } from '@mui/icons-material'
import type { BillCategory } from '@/types/bill'

export const categoryMeta: Record<
  BillCategory,
  { label: string; icon: SvgIconComponent; color: string }
> = {
  motorcycle: { label: 'Motorcycle', icon: TwoWheelerIcon, color: '#f9ab00' },
  phone: { label: 'Phone', icon: SmartphoneIcon, color: '#1a73e8' },
  car: { label: 'Car', icon: DirectionsCarIcon, color: '#1e8e3e' },
  other: { label: 'Other', icon: ReceiptIcon, color: '#9334e6' },
}
