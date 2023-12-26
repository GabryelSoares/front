'use server'

import { Establishment } from '@/_core/domain/models/establishment';
import { UpdateEstablishmentFormValues } from '@/_core/domain/schemas/establishment/update-establishment-schema';
import { cookies } from 'next/headers';

export async function updateEstablishment(formmValues: UpdateEstablishmentFormValues, id: number): Promise<Establishment> {
  console.log('formmValues:: ', formmValues)
  const accessToken = cookies().get('accessToken')?.value || '';
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/establishments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      ...formmValues,
      carSlots: Number(formmValues.carSlots),
      motorcycleSlots: Number(formmValues.motorcycleSlots),
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
