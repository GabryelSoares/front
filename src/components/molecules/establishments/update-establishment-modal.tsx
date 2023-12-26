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
import { UpdateEstablishmentForm } from '@/components/forms/establishments/update-establishment-form'
import { Button } from '@/components/ui/button'

export default function UpdateEstablishmentModal() {
  const { showUpdateEstablishmentModal, setShowUpdateEstablishmentModal } = useContext(EstablishmentsContext)
  return (
    <Dialog open={showUpdateEstablishmentModal} onOpenChange={setShowUpdateEstablishmentModal}>
      <DialogTrigger asChild>
        <h1 className="text-2xl font-semibold tracking-tight flex flex-row hover:text-blue-500 text-blue-700 hover:cursor-pointer"><span className="pt-1 pr-1"><BookPlusIcon /></span> Establishments</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Atualizar estabelecimento</DialogTitle>
        </DialogHeader>
        <UpdateEstablishmentForm />
      </DialogContent>
    </Dialog>
  )
}
