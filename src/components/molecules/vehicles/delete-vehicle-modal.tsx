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
import { Button } from '@/components/ui/button'

export default function DeleteVehicleModal() {
  const { showDeleteVehicleModal, setShowDeleteVehicleModal, deleteVehicle, selectedVehicles } = useContext(VehiclesContext)
  return (
    <Dialog open={showDeleteVehicleModal} onOpenChange={setShowDeleteVehicleModal}>
      <DialogTrigger asChild>
        <h1 className="text-2xl font-semibold tracking-tight flex flex-row hover:text-blue-500 text-blue-700 hover:cursor-pointer"><span className="pt-1 pr-1"><BookPlusIcon /></span> Vehicles</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apagar veículo</DialogTitle>
        </DialogHeader>
        <div>
          <p>Tem certeza que deseja apagar o veículo?</p>
          <p>Esta ação não pode ser desfeita.</p>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="default" onClick={() => {
            deleteVehicle(selectedVehicles[0]?.id)
          }}>
            Apagar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
