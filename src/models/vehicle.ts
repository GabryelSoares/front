import { VehicleTypeEnum } from "@/enums/vehicle-type.enum";
import { Establishment } from "./establishment";
import { ParkingRegister } from "./parking-register";

export interface Vehicle {
id: number;
brand: string;
model: string;
color: string;
plate: string;
type: VehicleTypeEnum;
createdAt: Date;
updatedAt: Date;
deletedAt: Date;
establishment: Establishment;
parkingRegisters: ParkingRegister[];
}
