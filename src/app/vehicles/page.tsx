"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCallback, useContext, useEffect } from "react"
import { BookPlusIcon, Search } from "lucide-react"
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
import { getVehicles } from "@/_core/infra/actions/vehicles/getVehicles"
import { toast } from "sonner"
import { ListVehiclesForm } from "@/components/forms/vehicles/list-vehicles-form"
import { CreateParkingRegisterModal } from "@/components/modals/create-parking-register-modal"
import { CreateVehicleModal } from "@/components/modals/create-vehicle-modal"
import { VehicleTypeEnum } from "@/enums/vehicle-type.enum"

export default function VehiclesPage() {
  const {
    isLoading,
    vehicles,
    setVehicles,
    showCreateVehicleModal,
    setShowCreateVehicleModal,
    showUpdateVehicleModal,
    showDeleteVehicleModal,
    showViewVehicleModal,
    setSubmitFetchVehicles,
    submitFetchVehicles
  } = useContext(VehiclesContext)

  const handleSubmit = useCallback(() => {
    // const formValues = form.getValues()
    // console.log('formValues:: ', formValues)
    getVehicles().then((vehicles) => {
      toast('Lista de veículos atualizada com sucesso!')
      setVehicles(vehicles)
      setSubmitFetchVehicles(false)
    }).catch((error) => {
      console.log('error:: ', error)
      toast(error.message || "Erro ao buscar veículos")
    })
  }, []);

  useEffect(() => {
    if(submitFetchVehicles) {
      console.log('submitFetchVehicles:: ', submitFetchVehicles)
      handleSubmit()
    }
  }, [submitFetchVehicles])

  return (
    <div className="p-4">
      <CreateParkingRegisterModal />
      <div className="flex items-center justify-between">
        <CreateVehicleModal>
          <h1 className="text-2xl font-semibold tracking-tight flex flex-row hover:text-blue-500 text-blue-700 hover:cursor-pointer"><span className="pt-1 pr-1"><BookPlusIcon /></span> Vehicles</h1>
        </CreateVehicleModal>
        {/* <ListVehiclesForm onSubmit={handleSubmit} /> */}
        <button
          
          disabled={isLoading}
          onClick={handleSubmit}
        >
          <Search />
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
                <TableHead>{item?.type === VehicleTypeEnum.CAR ? 'Carro' : 'Moto'}</TableHead>
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
