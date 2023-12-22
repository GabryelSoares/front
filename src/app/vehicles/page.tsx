"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useContext, useEffect } from "react"
import { BookPlusIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateVehicleForm } from "@/components/forms/vehicles/create-vehicle-form"
import { VehiclesContext } from "@/context/vehicles-context"
import { RowActionsDropdown } from "@/components/molecules/vehicles/row-actions-dropdown"
import ViewVehicleModal from "@/components/molecules/vehicles/view-vehicle-modal"
import UpdateVehicleModal from "@/components/molecules/vehicles/update-vehicle-modal"
import DeleteVehicleModal from "@/components/molecules/vehicles/delete-vehicle-modal"
import { ListVehiclesForm } from "@/components/forms/vehicles/list-vehicles-form"

export default function VehiclesPage() {
  const {
    fetchVehicles,
    isLoading,
    vehicles,
    showCreateVehicleModal,
    setShowCreateVehicleModal,
    showUpdateVehicleModal,
    showDeleteVehicleModal,
    showViewVehicleModal,
    submitFetchVehicles 
  } = useContext(VehiclesContext)

  useEffect(() => {
    console.log('submitFetchVehicles:: ', submitFetchVehicles)
    if(submitFetchVehicles) {
      fetchVehicles()
    }
  }, [submitFetchVehicles])

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <Dialog open={showCreateVehicleModal} onOpenChange={setShowCreateVehicleModal}>
          <DialogTrigger asChild>
            <h1 className="text-2xl font-semibold tracking-tight flex flex-row hover:text-blue-500 text-blue-700 hover:cursor-pointer"><span className="pt-1 pr-1"><BookPlusIcon /></span> Vehicles</h1>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cadastrar veículo</DialogTitle>
            </DialogHeader>
            <CreateVehicleForm />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* <ListVehiclesForm /> */}
        <button
          className="font-semibold rounded-md p-2 outline-none focus:border focus:border-gray-400  hover:text-blue-500 text-blue-700 hover:cursor-pointer"
          disabled={isLoading}
          onClick={() => fetchVehicles()}
        >
          Search
        </button>
      </div>
      <Card>
        <Table>
          <TableCaption>Lista de veículos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="" />
              <TableHead>Placa</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Cor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles && Array.isArray(vehicles) && vehicles?.map((item, i) => (
              <TableRow key={item.id || i}>
                <TableHead><RowActionsDropdown vehicle={item} /></TableHead>
                <TableHead className="font-medium">{item?.plate || '-'}</TableHead>
                <TableHead>{item?.type || '-'}</TableHead>
                <TableHead>{item?.brand || '-'}</TableHead>
                <TableHead>{item?.model || '-'}</TableHead>
                <TableHead>{item?.color || '-'}</TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {showViewVehicleModal && <ViewVehicleModal />}
      {showUpdateVehicleModal && <UpdateVehicleModal />}
      {showDeleteVehicleModal && <DeleteVehicleModal />}
    </div>
  )
}
