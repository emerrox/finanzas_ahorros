"use client"
import { router } from "@inertiajs/react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React from "react"
import { usePage } from "@inertiajs/react"

interface DeleteConfirmationModalProps {
  transactionId: number | null
  open: boolean
  setOpen: (open: boolean) => void
  onDelete?: (deletedId: number) => void // Nueva prop para manejar la eliminación
}

export default function DeleteConfirmationModal({ transactionId, open, setOpen, onDelete }: DeleteConfirmationModalProps) {
  const { props } = usePage()

  const handleDelete = () => {
    if (transactionId) {
      router.delete(`/transactions/${transactionId}`, {
        preserveScroll: true,
        onSuccess: () => {
          setOpen(false)
          // Actualizar el estado local si se proporcionó el callback
          if (onDelete) {
            onDelete(transactionId)
          }
          // O usar Inertia para invalidar la caché
          router.reload({ only: ['transactions'] })
        },
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#2c3e50]">¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription className="text-[#5480a3]">
            Esta acción no se puede deshacer. Esta transacción se eliminará permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-[#a6bfd3] text-[#2c3e50]">Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700">
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}