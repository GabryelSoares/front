'use server'

import { ParkingRegister } from '@/_core/domain/models/parking-register';
import { CreateParkingRegisterFormValues } from '@/_core/domain/schemas/parking-registers/create-parking-register-schema';
import { cookies } from 'next/headers';

export async function createParkingRegister(formmValues: CreateParkingRegisterFormValues): Promise<ParkingRegister> {
  console.log('formmValues:: ', formmValues)
  const accessToken = cookies().get('accessToken')?.value || '';
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parking-registers/entry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      ...formmValues,
      vehicleType: Number(formmValues.vehicleType),
    }),
  }).then((res) => res.json());

  console.log('response:: ', response)

  if(response.message && typeof response.message === 'string') {
    throw new Error(response.message);
  }

  if(!response.plate) {
    throw new Error(response.message);
  }
  return response;
}
