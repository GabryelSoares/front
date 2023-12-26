import { Metadata } from "next"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SignUpForm } from "@/components/forms/sign-up-form"
import { LuParkingCircle } from "react-icons/lu"
import SystemDescription from "@/components/atoms/system-description/system-description"

export const metadata: Metadata = {
  title: "Cadatro",
  description: "Página de criação de conta do sistema",
}

export default function SignUpPage() {
  return (
    <>
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
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
