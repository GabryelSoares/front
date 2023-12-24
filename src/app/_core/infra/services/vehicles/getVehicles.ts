'use server'

import { cookies } from 'next/headers'

export async function getVehicles(formData: FormData) {
  try {
    const accessToken = cookies().get('accessToken')?.value
    if(!accessToken) throw new Error('No access token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/vehicles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        teste: formData.get('teste')
      }),
    })
    await new Promise((resolve) => setTimeout(resolve, 5000))

    if(!res.ok) {
      throw new Error('Failed to fetch data')
    }
  
    return res.json()
  } catch (error) {
    return error
  }
}
