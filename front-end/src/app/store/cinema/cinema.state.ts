import { Cinema } from "src/app/core/models/cinema.model";

export interface CinemaState {
  cinemas: Cinema[]
};

export const initialCinemaState: CinemaState = {
  cinemas: []
};