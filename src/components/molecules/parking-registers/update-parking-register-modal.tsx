"use client"
import { VehiclesContext } from '@/context/vehicles-context'
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
import { UpdateVehicleForm } from '@/components/forms/vehicles/update-vehicle-form'
import { Button } from '@/components/ui/button'

export default function UpdateVehicleModal() {
  const { showUpdateVehicleModal, setShowUpdateVehicleModal } = useContext(VehiclesContext)
  return (
    <Dialog open={showUpdateVehicleModal} onOpenChange={setShowUpdateVehicleModal}>
      <DialogTrigger asChild>
        <h1 className="text-2xl font-semibold tracking-tight flex flex-row hover:text-blue-500 text-blue-700 hover:cursor-pointer"><span className="pt-1 pr-1"><BookPlusIcon /></span> Vehicles</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Atualizar veículo</DialogTitle>
        </DialogHeader>
        <UpdateVehicleForm />
      </DialogContent>
    </Dialog>
  )
}
