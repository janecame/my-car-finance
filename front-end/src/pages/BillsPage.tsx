import { useState } from 'react'
import { Button, Stack, CircularProgress, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { PageHeader } from '@/components/common/PageHeader'
import { MonthlyTotalCard } from '@/features/bills/components/MonthlyTotalCard'
import { BillCard } from '@/features/bills/components/BillCard'
import { BillFormDialog } from '@/features/bills/components/BillFormDialog'
import {
  useBills,
  useCreateBill,
  useUpdateBill,
  useDeleteBill,
  useTogglePaid,
  summarize,
} from '@/features/bills/hooks/useBills'
import type { BillFormValues } from '@/features/bills/schema'
import type { Bill } from '@/types/bill'
import { monthKey } from '@/lib/date'

export function BillsPage() {
  const { data: bills = [], isLoading } = useBills()
  const createBill = useCreateBill()
  const updateBill = useUpdateBill()
  const deleteBill = useDeleteBill()
  const togglePaid = useTogglePaid()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Bill | null>(null)

  const summary = summarize(bills, monthKey())

  const openAdd = () => {
    setEditing(null)
    setDialogOpen(true)
  }
  const openEdit = (bill: Bill) => {
    setEditing(bill)
    setDialogOpen(true)
  }

  const handleSubmit = (values: BillFormValues) => {
    if (editing) {
      updateBill.mutate({ id: editing.id, input: values })
    } else {
      createBill.mutate(values)
    }
    setDialogOpen(false)
  }

  return (
    <>
      <PageHeader
        title="Bills"
        subtitle="Your recurring monthly payments"
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>
            Add bill
          </Button>
        }
      />

      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          <MonthlyTotalCard {...summary} />
          {bills.map((bill) => (
            <BillCard
              key={bill.id}
              bill={bill}
              onTogglePaid={(id) => togglePaid.mutate({ id })}
              onEdit={openEdit}
              onDelete={(b) => deleteBill.mutate(b.id)}
            />
          ))}
        </Stack>
      )}

      <BillFormDialog
        open={dialogOpen}
        bill={editing}
        saving={createBill.isPending || updateBill.isPending}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}
