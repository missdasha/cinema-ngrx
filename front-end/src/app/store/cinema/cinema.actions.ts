import { createAction, props } from '@ngrx/store';
import { Cinema } from 'src/app/core/models/cinema.model';

export const loadCinemas = createAction(
  '[Cinemas] Load Cinemas'
);

export const loadCinemasSuccess = createAction(
  '[Cinemas] Load Cinemas Success',
  props<{ cinemas: Cinema[] }>()
);

