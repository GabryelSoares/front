"use client"
import { EstablishmentsContext } from '@/context/establishments-context'
import { BookPlusIcon } from 'lucide-react'
import React, { useCallback, useContext } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { deleteEstablishment } from '@/_core/infra/actions/establishments/delete-vehicle'
import { toast } from 'sonner'

export default function DeleteEstablishmentModal() {
  const { showDeleteEstablishmentModal, selectedEstablishments, setShowDeleteEstablishmentModal, setSubmitFetchEstablishments } = useContext(EstablishmentsContext)
  
  const handleSubmit = useCallback(() => {
    deleteEstablishment(selectedEstablishments[0].id).then(() => {
      toast("Estabelecimento apagado com sucesso!")
      setSubmitFetchEstablishments(true)
      setShowDeleteEstablishmentModal(false)
    }).catch((error) => {
      toast(error.message || "Erro ao apagar estabelecimento")
    })
  }, [selectedEstablishments]);
  
  return (
    <Dialog open={showDeleteEstablishmentModal} onOpenChange={setShowDeleteEstablishmentModal}>
      <DialogTrigger asChild>
        <h1 className="text-2xl font-semibold tracking-tight flex flex-row hover:text-blue-500 text-blue-700 hover:cursor-pointer"><span className="pt-1 pr-1"><BookPlusIcon /></span> Establishments</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apagar estabelecimento</DialogTitle>
        </DialogHeader>
        <div>
          <p>Tem certeza que deseja apagar o estabelecimento?</p>
          <p>Esta ação não pode ser desfeita.</p>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button type="submit" variant="default" onClick={handleSubmit}>
            Apagar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
