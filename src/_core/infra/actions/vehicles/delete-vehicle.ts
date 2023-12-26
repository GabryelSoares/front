'use server'

import { cookies } from 'next/headers';

export async function deleteVehicle(id: number): Promise<void> {
  const accessToken = cookies().get('accessToken')?.value || '';
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());

  console.log('response:: ', response)

  if(response.message && typeof response.message === 'string'){
    throw new Error(response.message);
  }
}
