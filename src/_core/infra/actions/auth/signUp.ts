'use server'

import { redirect } from 'next/navigation';

export async function signUp(formData: FormData): Promise<void> {
  const body = Object.fromEntries(formData.entries());
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...body,
      carSlots: Number(body.carSlots),
      motorcycleSlots: Number(body.motorcycleSlots)
    }),
  }).then((res) => res.json());
  if(!res?.accessToken) {
    console.log('res:: ', res)
    throw new Error(res?.message);
  }
  redirect('/sign-in')
}
