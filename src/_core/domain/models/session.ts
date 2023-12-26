import { Establishment } from "./establishment";

export interface Session {
  isAuthenticated: boolean;
  establishment?: Establishment;
}
