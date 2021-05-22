import { Seance } from './seance.model';

export interface Film {
  _id: string;
  title: string;
  genres: string[];
  description: string;
  age: number;
  imageSrc: string;
  duration: { hours: number; minutes: number };
  startDate: number;
  endDate: number;
  seances: Seance[];
}
