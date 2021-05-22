import { Service } from "./service.model";

export interface Cinema {
  name: string;
  city: string;
  address: string;
  halls: Array<{ seatsTypes: string[]; plan: string[][] }>;
  additionalServices: Service[];
}
