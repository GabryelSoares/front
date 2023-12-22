import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SignInForm } from "@/components/forms/sign-in-form"
import { LuParkingCircle } from "react-icons/lu"

export const metadata: Metadata = {
  title: "SignIn",
  description: "SignInPage forms built using the components.",
}
export default function SignInPage() {
  
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Sign Up
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
                Login
              </h1>
            </div>
            <SignInForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link
                href="/sign-in"
                className="underline underline-offset-4 hover:text-primary"
              >
                Clique aqui, para acessar
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
