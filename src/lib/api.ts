'use client'
import { ApiResponse } from "@/models/api-response";

export const api = async <T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
  await new Promise((resolve) => setTimeout(resolve, 1 * 1000));
  if(accessToken) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    };
  }

  return await fetch(process.env.NEXT_PUBLIC_API_URL + url, options).then(async (response) => {
    const data = await response.json();
    if(response.ok) {
      return { data, status: response.status };
    } else {
      return Promise.reject({ data, status: response.status });
    }
  });
};
