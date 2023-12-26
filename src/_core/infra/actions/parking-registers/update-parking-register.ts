'use server'

import { ParkingRegister } from '@/_core/domain/models/parking-register';
import { UpdateParkingRegisterFormValues } from '@/_core/domain/schemas/parking-registers/update-parking-register-schema';
import { cookies } from 'next/headers';

export async function updateParkingRegister(formmValues: UpdateParkingRegisterFormValues, id: number): Promise<ParkingRegister> {
  console.log('formmValues:: ', formmValues)
  const accessToken = cookies().get('accessToken')?.value || '';
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parking-registers/exit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      ...formmValues,
    }),
  }).then((res) => res.json());

  console.log('response:: ', response)

  if(response.message && typeof response.message === 'string'){
    throw new Error(response.message);
  }

  if(!response.id) {
    throw new Error(response.message);
  }
  return response;
}
