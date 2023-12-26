'use server'

import { Vehicle } from '@/_core/domain/models/vehicle';
import { UpdateVehicleFormValues } from '@/_core/domain/schemas/vehicle/update-vehicle-schema';
import { cookies } from 'next/headers';

export async function updateVehicle(formmValues: UpdateVehicleFormValues, id: number): Promise<Vehicle> {
  console.log('formmValues:: ', formmValues)
  const accessToken = cookies().get('accessToken')?.value || '';
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      ...formmValues,
      type: Number(formmValues.type),
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
