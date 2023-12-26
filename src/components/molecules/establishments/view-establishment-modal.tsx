"use client"
import { EstablishmentsContext } from '@/context/establishments-context'
import { BookPlusIcon } from 'lucide-react'
import React, { useContext } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ViewEstablishmentForm } from '@/components/forms/establishments/view-establishment-form'
import { Button } from '@/components/ui/button'

export default function ViewEstablishmentModal() {
  const { showViewEstablishmentModal, setShowViewEstablishmentModal } = useContext(EstablishmentsContext)
  return (
    <Dialog open={showViewEstablishmentModal} onOpenChange={setShowViewEstablishmentModal}>
      <DialogTrigger asChild>
        <h1 className="text-2xl font-semibold tracking-tight flex flex-row hover:text-blue-500 text-blue-700 hover:cursor-pointer"><span className="pt-1 pr-1"><BookPlusIcon /></span> Establishments</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do estabelecimento</DialogTitle>
        </DialogHeader>
        <ViewEstablishmentForm />
      </DialogContent>
    </Dialog>
  )
}
