import { getVehicles } from "@/app/_core/infra/services/vehicles/getVehicles"

export default async function GetVehiclesForm() {
  return (
    <form action={getVehicles}>
      <input type="text" name="teste" />
      <button type="submit">Search vehicles</button>
    </form>
  )
}
