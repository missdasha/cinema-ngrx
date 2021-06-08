import { Seance } from "../../../core/models/seance.model";
import { Service } from "../../../core/models/service.model";

export interface Order {
  userId: string;
  seance: Seance;
  services: Array<{amount: number, service: Service}>;
  seats: Array<{row: number, seat: number, type: string}>;
  totalCost: number;
}
