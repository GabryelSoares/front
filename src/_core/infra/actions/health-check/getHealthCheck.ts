'use server'

export async function getHealthCheck() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    await new Promise((resolve) => setTimeout(resolve, 9000))
    
    if(!res.ok) {
      throw new Error('Failed to fetch data')
    }
  
    return res.json()
  } catch (error) {
    return error
  }
}
