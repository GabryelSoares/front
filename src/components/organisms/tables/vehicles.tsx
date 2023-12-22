"use client"
import {
  TableHead,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { Vehicle } from "@/models/vehicle"
import { api } from "@/lib/api"

export default async function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  async function getVehicles() {
    try {
      const response = await api('/vehicles', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setVehicles(response)
    } catch(error) {
      toast({
        title: "Erro ao buscar estabelecimentos",
      })
    }
  }

  useEffect(() => {
    if(vehicles) {
      console.log('vehicles:: ', vehicles)
    }
  }, [vehicles])

  return (
    <>
      {vehicles && vehicles?.map((item, idx) => (
        <TableRow>
          <TableHead className="font-medium">{item.plate}</TableHead>
          <TableHead>{item.type}</TableHead>
          <TableHead>{item.brand}</TableHead>
          <TableHead>{item.model}</TableHead>
          <TableHead>{item.color}</TableHead>
        </TableRow>
      ))}
    </>
  )
}
