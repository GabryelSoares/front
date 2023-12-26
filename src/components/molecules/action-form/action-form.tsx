'use client'

import React, { DetailedHTMLProps, PropsWithChildren, useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"

type HTMLFormProps = DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

type Props = PropsWithChildren<Omit<HTMLFormProps, "action"> & {
  action: (prevState: any, formData: FormData) => Promise<any>;
  onSuccess?: (response: any) => void;
}>
export function ActionForm({ action, children, onSuccess, ...props }: Props) {
  const [state, formAction] = useFormState(action, { error: null })

  return (
    <form {...props}>
      {state.error && (
         <div className="bg-red-500 text-white p-2 mb-2 rounded w-full">
            {state.error}
         </div>
      )}
      {children}
    </form>
  )
}
