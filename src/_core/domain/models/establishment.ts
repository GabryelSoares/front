export interface Establishment { 
  id: number;
  name: string;
  cnpj: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  motorcycleSlots: number;
  carSlots: number;
  availableCarSlots: number;
  availableMotorcycleSlots: number;
  parkingRegisters?: any[];
  vehicles?: any[]; 
}
