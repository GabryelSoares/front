'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import GetVehiclesForm from "./getVehiclesForm"

export default function Teste() {
  const session = useSession()
  // const { pending } = useFormStatus()
  if(session) {
    return (
      <>
        <h1>Teste</h1>
        <pre>
          <code>
            {JSON.stringify(session, null, 2)}
          </code>
        </pre>
        <br />
        <button onClick={() => signOut()}>Sign out</button>
        <br />
        <br />
        <GetVehiclesForm />
      </>
    )
  }
  return (
    <>
      <h1>Teste</h1>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
