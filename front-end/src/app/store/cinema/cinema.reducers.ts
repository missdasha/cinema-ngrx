import { createReducer, on } from '@ngrx/store';
import { initialCinemaState } from "./cinema.state";
import { addCinemaFailure, addCinemaSuccess, loadCinemasSuccess, reset } from './cinema.actions';

export const cinemaReducer = createReducer(
  initialCinemaState,
  on(loadCinemasSuccess, (state, { cinemas }) => ({ ...state, cinemas })),
  on(addCinemaSuccess, (state, { cinema, message }) => ({ 
    cinemas: JSON.parse(JSON.stringify(state.cinemas)).concat(cinema),
    successMessage: message,
    error: null
  })),
  on(addCinemaFailure, (state, { error }) => ({ ...state, successMessage: '', error })),
  on(reset, (state) => ({ ...state, successMessage: '', error: null}))
);
