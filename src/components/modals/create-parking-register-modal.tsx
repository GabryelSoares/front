import React, { useContext } from 'react'
import { ParkingRegistersContext } from '@/context/parking-registers-context'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateParkingRegisterForm } from '../forms/parking-registers/create-parking-registe-form'

interface Props {
  children?: React.ReactNode;
}

export function CreateParkingRegisterModal({ children }: Props) {

  const {
    showCreateParkingRegisterModal,
    setShowCreateParkingRegisterModal
  } = useContext(ParkingRegistersContext)

  return (

    <Dialog open={showCreateParkingRegisterModal} onOpenChange={setShowCreateParkingRegisterModal}>
      {children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between">Registrar entrada de veículo</DialogTitle>
        </DialogHeader>
        <CreateParkingRegisterForm />
      </DialogContent>
    </Dialog>
  )
}
