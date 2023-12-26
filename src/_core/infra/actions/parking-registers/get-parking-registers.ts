'use server'

import { ParkingRegister } from '@/_core/domain/models/parking-register';
import { cookies } from 'next/headers';

export async function getParkingRegisters(): Promise<ParkingRegister[]> {
  const accessToken = cookies().get('accessToken')?.value || '';
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parking-registers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })

  console.log('response:: ', response)

  const data = await response.json();

  console.log('data:: ', data)

  if(data.message && typeof data.message === 'string'){
    throw new Error(data.message);
  }

  if(!Array.isArray(data)) {
    throw new Error(data);
  }
  return data?.map((parkingRegister) => ({
    id: parkingRegister.id,
    entry: parkingRegister.entry,
    exit: parkingRegister.id,
    vehicle: parkingRegister.vehicle || parkingRegister['__vehicle__'],
    establishment: parkingRegister.establishment || parkingRegister['__establishment__'],
  }))
}
