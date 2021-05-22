import { Seance } from "./seance.model";
import { Service } from "./service.model";

export interface Order {
  userId: string,
  seance: Seance;
  services: Array<{amount: number, service: Service}>;
  seats: Array<{row: number, seat: number, type: string}>;
  totalCost: number;
}
