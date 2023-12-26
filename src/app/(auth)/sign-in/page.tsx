import { Metadata } from "next"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SignInForm } from "@/components/forms/sign-in-form"
import { LuParkingCircle } from "react-icons/lu"
import SystemDescription from "@/components/atoms/system-description/system-description"

export const metadata: Metadata = {
  title: "Login",
  description: "Página de login do sistema",
}
export default function SignInPage() {
  
  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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
            <SystemDescription />
          </div>
        </div>
        <div className="p-8 h-full flex flex-col items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login
              </h1>
            </div>
            <SignInForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link
                href="/sign-up"
                className="underline underline-offset-4 hover:text-primary"
              >
                Clique aqui, registrar-se
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
