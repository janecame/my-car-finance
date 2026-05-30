import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { BillsPage } from '@/pages/BillsPage'
import { FinancePage } from '@/pages/FinancePage'
import { RemindersPage } from '@/pages/RemindersPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'bills', element: <BillsPage /> },
      { path: 'finance', element: <FinancePage /> },
      { path: 'reminders', element: <RemindersPage /> },
    ],
  },
])
