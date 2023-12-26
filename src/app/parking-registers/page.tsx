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
import { ParkingRegistersContext } from "@/context/parking-registers-context"
import { RowActionsDropdown } from "@/components/molecules/parking-registers/row-actions-dropdown"
import ViewParkingRegisterModal from "@/components/molecules/parking-registers/view-parking-register-modal"
import UpdateParkingRegisterModal from "@/components/molecules/parking-registers/update-parking-register-modal"
import DeleteParkingRegisterModal from "@/components/molecules/parking-registers/delete-parking-register-modal"
import { getParkingRegisters } from "@/_core/infra/actions/parking-registers/get-parking-registers"
import { toast } from "sonner"
import { formatDate } from "@/lib/utils"
import { CreateParkingRegisterModal } from "@/components/modals/create-parking-register-modal"

export default function ParkingRegistersPage() {
  const {
    isLoading,
    parkingRegisters,
    setParkingRegisters,
    showUpdateParkingRegisterModal,
    showDeleteParkingRegisterModal,
    showViewParkingRegisterModal,
    setSubmitFetchParkingRegisters,
    submitFetchParkingRegisters
  } = useContext(ParkingRegistersContext)

  const handleSubmit = useCallback(() => {
    // const formValues = form.getValues()
    // console.log('formValues:: ', formValues)
    getParkingRegisters().then((parkingRegisters) => {
      toast('Lista de veículos atualizada com sucesso!')
      setParkingRegisters(parkingRegisters)
      setSubmitFetchParkingRegisters(false)
    }).catch((error) => {
      console.log('error:: ', error)
      toast(error.message || "Erro ao buscar veículos")
    })
  }, []);

  useEffect(() => {
    if(submitFetchParkingRegisters) {
      console.log('submitFetchParkingRegisters:: ', submitFetchParkingRegisters)
      handleSubmit()
    }
  }, [submitFetchParkingRegisters])

  useEffect(() => {
    console.log('parkingRegisters:: ', parkingRegisters)
  }, [parkingRegisters])

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <CreateParkingRegisterModal>
          <h1 className="text-2xl font-semibold tracking-tight flex flex-row hover:text-blue-500 text-blue-700 hover:cursor-pointer">
            <span className="pt-1 pr-1">
              <BookPlusIcon />
            </span>
            Registros de estacionamento
          </h1>
        </CreateParkingRegisterModal>
        {/* <ListParkingRegistersForm onSubmit={handleSubmit} /> */}
        <button

          disabled={isLoading}
          onClick={handleSubmit}
        >
          <Search />
        </button>
      </div>
      <Card>
        <Table>
          <TableCaption>Lista de entrada/saída</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="" />
              <TableHead>Placa</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Entrada</TableHead>
              <TableHead>Saída</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parkingRegisters && Array.isArray(parkingRegisters) && parkingRegisters?.map((item, i) => (
              <TableRow key={item.id || i}>
                <TableHead><RowActionsDropdown parkingRegister={item} /></TableHead>
                <TableHead className="font-medium">{item?.vehicle?.plate || '-'}</TableHead>
                <TableHead>{String(item?.vehicle?.model)}</TableHead>
                <TableHead>{item?.entry ? formatDate(new Date(item.entry)) : '-'}</TableHead>
                <TableHead>{item?.exit ? formatDate(new Date(item.exit)) : '-'}</TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {showViewParkingRegisterModal && <ViewParkingRegisterModal />}
      {showUpdateParkingRegisterModal && <UpdateParkingRegisterModal />}
      {showDeleteParkingRegisterModal && <DeleteParkingRegisterModal />}
    </div>
  )
}
