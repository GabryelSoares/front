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
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { Establishment } from "@/models/establishment"

export default async function TaskPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [establishments, setEstablishments] = useState<Establishment[]>([])

  async function getEstablishments() {
    'use client'
    setIsLoading(true)
    axios.get(process.env.NEXT_PUBLIC_API_URL + '/establishments', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => {
      setEstablishments(res.data)
    }).catch((err) => {
      console.log(err);
      toast({
        title: "Erro ao buscar estabelecimentos",
      })
    }).finally(() => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    if(establishments) {
      console.log('establishments:: ', establishments)
    }
  }, [establishments])

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Establishments</h1>
        <button
          className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
          disabled={isLoading}
          onClick={() => getEstablishments()}
        >
          Search
        </button>
      </div>
      <>
        <Table>
          <TableCaption>A list of establishments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="w-[100px]">Car Slots</TableHead>
              <TableHead>Motorcycle Slots</TableHead>
              <TableHead>Cnpj</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {establishments && establishments?.map((item, idx) => (
              <TableRow key={item?.id || idx}>
                <TableHead className="w-[100px]">{item?.name || '-'}</TableHead>
                <TableHead className="font-medium">{item?.address || '-'}</TableHead>
                <TableHead>{item?.availableCarSlots || '-'}/{item?.carSlots || '-'}</TableHead>
                <TableHead>{item?.availableMotorcycleSlots || '-'}/{item?.motorcycleSlots || '-'}</TableHead>
                <TableHead>{item?.cnpj || '-'}</TableHead>
                <TableHead>{item?.email || '-'}</TableHead>
                <TableHead>{item?.phone || '-'}</TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    </div>
  )
}
