'use client'

import React, { DetailedHTMLProps } from "react"
import { useFormStatus } from "react-dom"
import { Icons } from "../icons/icons";

type Props = DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function SubmitButton({ children, disabled, ...props }: Props) {
  const status = useFormStatus();

  return (
    <button type="submit" {...props} disabled={status.pending || disabled} className={
      `font-bold text-gray-600 transition-transform duration-300 hover:scale-105 hover:text-my_blue hover:bg-gray-100 p-2 rounded hidden md:block ${props.className}
    `}>
      {status.pending && (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin bg-red-500" />
      )}
      {children ? children : 'Enviar'}
    </button>
  )
}
