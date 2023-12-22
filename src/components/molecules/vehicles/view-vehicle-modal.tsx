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
import { ViewVehicleForm } from '@/components/forms/vehicles/view-vehicle-form'
import { Button } from '@/components/ui/button'

export default function ViewVehicleModal() {
  const { showViewVehicleModal, setShowViewVehicleModal } = useContext(VehiclesContext)
  return (
    <Dialog open={showViewVehicleModal} onOpenChange={setShowViewVehicleModal}>
      <DialogTrigger asChild>
        <h1 className="text-2xl font-semibold tracking-tight flex flex-row hover:text-blue-500 text-blue-700 hover:cursor-pointer"><span className="pt-1 pr-1"><BookPlusIcon /></span> Vehicles</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do veículo</DialogTitle>
        </DialogHeader>
        <ViewVehicleForm />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
