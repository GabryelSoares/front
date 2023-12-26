'use server'

import { Establishment } from '@/_core/domain/models/establishment';
import { CreateEstablishmentFormValues } from '@/_core/domain/schemas/establishment/create-establishment-schema';
import { cookies } from 'next/headers';

export async function createEstablishment(formmValues: CreateEstablishmentFormValues): Promise<Establishment> {
  console.log('formmValues:: ', formmValues)
  const accessToken = cookies().get('accessToken')?.value || '';
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/establishments`, {
    method: "POST",
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

  if(!response.plate) {
    throw new Error(response.message);
  }
  return response;
}
