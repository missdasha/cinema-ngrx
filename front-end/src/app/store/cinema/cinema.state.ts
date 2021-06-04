import { Cinema } from "src/app/core/models/cinema.model";

export interface CinemaState {
  cinemas: Cinema[],
  successMessage: string,
  error: any
};

export const initialCinemaState: CinemaState = {
  cinemas: [],
  successMessage: '', 
  error: null
};