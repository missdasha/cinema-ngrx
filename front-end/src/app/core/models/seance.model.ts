import { Cinema } from './cinema.model';

export interface Seance {
  _id?: string;
  film: string;
  startTime: number;
  endTime: number;
  cinema: Cinema;
  hallNumber: number;
  format: string;
  occupiedSeats: boolean[][];
  prices: {standard?: number; loveSeats?: number; vip?: number};
}
