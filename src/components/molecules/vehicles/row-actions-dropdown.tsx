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
import { Vehicle } from "@/models/vehicle"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { VehiclesContext } from "@/context/vehicles-context"
import { useContext } from "react"

interface Props {
  vehicle: Vehicle
}
export function RowActionsDropdown({ vehicle }: Props) {

  const {
    setShowViewVehicleModal,
    setShowUpdateVehicleModal,
    setShowDeleteVehicleModal,
    setSelectedVehicles,
  } = useContext(VehiclesContext)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <DotsVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          console.log('Visualizar:: ', vehicle)
          setShowViewVehicleModal(true)
          setSelectedVehicles([vehicle])
        }}>Visualizar</DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          console.log('Alterar:: ', vehicle)
          setShowUpdateVehicleModal(true)
          setSelectedVehicles([vehicle])
        }}>Alterar</DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          console.log('Apagar:: ', vehicle)
          setShowDeleteVehicleModal(true)
          setSelectedVehicles([vehicle])
        }}>Apagar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
