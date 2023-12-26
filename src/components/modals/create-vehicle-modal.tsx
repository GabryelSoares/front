import React, { useContext } from 'react'
import { VehiclesContext } from '@/context/vehicles-context'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateVehicleForm } from '../forms/vehicles/create-vehicle-form';

interface Props {
  children?: React.ReactNode;
}

export function CreateVehicleModal({ children }: Props) {

  const {
    showCreateVehicleModal,
    setShowCreateVehicleModal
  } = useContext(VehiclesContext)

  return (

    <Dialog open={showCreateVehicleModal} onOpenChange={setShowCreateVehicleModal}>
      {children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastrar veículo</DialogTitle>
        </DialogHeader>
        <CreateVehicleForm />
      </DialogContent>
    </Dialog>
  )
}
