import { Establishment } from "./establishment";
import { Vehicle } from "./vehicle";

export interface ParkingRegister {
  id: number;
  entry: Date;
  exit: Date | null;
  vehicle: Vehicle;
  establishment: Establishment;
}
