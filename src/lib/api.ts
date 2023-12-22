'use client'
import { ApiResponse } from "@/models/api-response";

export const api = async <T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
  console.log('api:: ', url, options)
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
  console.log('accessToken:: ', accessToken)
  
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }).then(res => {
    console.log('res:: ', res)
    return res.json()
  });
  return response;
};
