'use server'

import { Establishment } from '@/_core/domain/models/establishment';
import { cookies } from 'next/headers';

export async function getEstablishments(): Promise<Establishment[]> {
  const accessToken = cookies().get('accessToken')?.value || '';
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/establishments`, {
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
