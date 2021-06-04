import { createAction, props } from '@ngrx/store';
import { Cinema } from 'src/app/core/models/cinema.model';

export const loadCinemas = createAction(
  '[Cinemas] Load Cinemas'
);

export const loadCinemasSuccess = createAction(
  '[Cinemas] Load Cinemas Success',
  props<{ cinemas: Cinema[] }>()
);

export const addCinema = createAction(
  '[Cinemas] Add Cinema',
  props<{ cinema: Cinema }>()
);

export const addCinemaSuccess = createAction(
  '[Cinemas] Add Cinema Success',
  props<{ cinema: Cinema, message: string }>()
);

export const addCinemaFailure = createAction(
  '[Cinemas] Add Cinema Failure',
  props<{ error: any }>()
);

export const reset = createAction(
  '[Cinemas] Reset Message and Error'
);
