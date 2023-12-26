'use client'
import { ApiResponse } from "@/_core/domain/models/api-response";

export const api = async <T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
  // console.log('api:: ', url, options)
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
  // console.log('accessToken:: ', accessToken)
  
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  })

  return response;
};
