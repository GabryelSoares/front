import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SignUpForm } from "@/components/forms/sign-up-form"
import { LuParkingCircle } from "react-icons/lu"

export const metadata: Metadata = {
  title: "SignUp",
  description: "SignUpPage forms built using the components.",
}

export default function SignUpPage() {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-lg text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <div
              className="flex flex-row justify-center font-bold text-white"
            >
              <LuParkingCircle size={30} />
              <span className='mt-1'>arking</span>
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;A parking management system enhances efficiency and security, integrating technology for dynamic monitoring and control. Focused on operational optimization, it provides a seamless experience, adapting to the demands of the environment.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Criar uma conta
              </h1>
            </div>
            <SignUpForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Clicando em continuar, você concorda com os nossos{" "}
              <span
                // href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de Uso
              </span>{" "}
              e{" "}
              <span
                // href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de Privacidade
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
