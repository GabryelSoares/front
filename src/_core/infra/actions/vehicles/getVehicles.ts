'use server'

import { Vehicle } from '@/_core/domain/models/vehicle';
import { cookies } from 'next/headers';

export async function getVehicles(): Promise<Vehicle[]> {
  const accessToken = cookies().get('accessToken')?.value || '';
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());

  console.log('response:: ', response)

  if(response.message && typeof response.message === 'string'){
    throw new Error(response.message);
  }

  if(!Array.isArray(response)) {
    throw new Error(response);
  }
  return response;
}
