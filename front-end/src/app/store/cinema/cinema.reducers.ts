import { createReducer, on } from '@ngrx/store';
import { initialCinemaState } from "./cinema.state";
import { loadCinemasSuccess } from './cinema.actions';

export const cinemaReducer = createReducer(
  initialCinemaState,
  on(loadCinemasSuccess, (state, { cinemas }) => ({ ...state, cinemas })),
);
