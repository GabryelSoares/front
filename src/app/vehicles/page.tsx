"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { Vehicle } from "@/models/vehicle"
import { api } from "@/lib/api"

export default function VehiclesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  async function getVehicles() {
    setIsLoading(true)
    try {
      const response = await api<Vehicle[]>('/vehicles')
      setVehicles(response.data)
    } catch(error) {
      toast({
        title: "Erro ao buscar veículos",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(vehicles) {
      console.log('vehicles:: ', vehicles)
    }
  }, [vehicles])

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Vehicles</h1>
        <button
          className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
          disabled={isLoading}
          onClick={() => getVehicles()}
        >
          Search
        </button>
      </div>
      <>
        <Table>
          <TableCaption>A list of vehicles.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Placa</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Cor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles && vehicles?.map((item, i) => (
              <TableRow key={item.id || i}>
                <TableHead className="font-medium">{item?.plate || '-'}</TableHead>
                <TableHead>{item?.type || '-'}</TableHead>
                <TableHead>{item?.brand || '-'}</TableHead>
                <TableHead>{item?.model || '-'}</TableHead>
                <TableHead>{item?.color || '-'}</TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    </div>
  )
}
