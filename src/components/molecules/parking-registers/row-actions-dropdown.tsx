"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ParkingRegister } from "@/_core/domain/models/parking-register"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { ParkingRegistersContext } from "@/context/parking-registers-context"
import { useContext } from "react"

interface Props {
  parkingRegister: ParkingRegister
}
export function RowActionsDropdown({ parkingRegister }: Props) {

  const {
    setShowViewParkingRegisterModal,
    setShowUpdateParkingRegisterModal,
    setShowDeleteParkingRegisterModal,
    setSelectedParkingRegisters,
  } = useContext(ParkingRegistersContext)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="destructive" className="hover:bg-gray-100 hover:border hover:border-gray-300 transition-transform duration-200 hover:cursor-pointer">
          <DotsVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white p-0 m-0">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0" onClick={() => {
          setShowViewParkingRegisterModal(true)
          setSelectedParkingRegisters([parkingRegister])
        }}>
          <span className="hover:bg-gray-100 p-2 w-full h-full transition-transform duration-200 hover:cursor-pointer">Visualizar</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0" onClick={() => {
          setShowUpdateParkingRegisterModal(true)
          setSelectedParkingRegisters([parkingRegister])
        }}>
          <span className="hover:bg-gray-100 p-2 w-full h-full transition-transform duration-200 hover:cursor-pointer">Alterar</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0" onClick={() => {
          setShowDeleteParkingRegisterModal(true)
          setSelectedParkingRegisters([parkingRegister])
        }}>
          <span className="hover:bg-gray-100 p-2 w-full h-full transition-transform duration-200 hover:cursor-pointer">Apagar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
