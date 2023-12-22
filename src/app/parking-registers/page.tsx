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
import { api } from "@/lib/api"
import { ParkingRegister } from "@/models/parking-register"
import { formatDate } from "@/lib/utils"

export default function ParkingRegisters() {
  const [isLoading, setIsLoading] = useState(false)
  const [parkingRegisters, setParkingRegisters] = useState<ParkingRegister[]>([])

  async function getParkingRegisters() {
    setIsLoading(true)
    try {
      const response = await api<ParkingRegister[]>('/parking-registers')
      setParkingRegisters(response.data)
    } catch(error) {
      toast({
        title: "Erro ao buscar registros de estacionamento",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(parkingRegisters) {
      console.log('parkingRegisters:: ', parkingRegisters)
    }
  }, [parkingRegisters])

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Registros de entrada e saída</h1>
        <div>
            
        </div>
        <button
          className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
          disabled={isLoading}
          onClick={() => getParkingRegisters()}
        >
          Pesquisar
        </button>
      </div>
      <>
        <Table>
          <TableCaption>A list of parking registers.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Entrada</TableHead>
              <TableHead>Saída</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead>Cor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parkingRegisters && parkingRegisters?.map((item, i) => (
              <TableRow key={item?.id || i}>
                <TableHead className="font-medium">{item?.vehicle?.plate || '-'}</TableHead>
                <TableHead>{item?.entry ? formatDate(new Date(item.entry)) : '-'}</TableHead>
                <TableHead>{item?.exit ? formatDate(new Date(item.exit)) : '-'}</TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    </div>
  )
}
