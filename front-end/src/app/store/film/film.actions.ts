import { createAction, props } from '@ngrx/store';
import { Film } from 'src/app/core/models/film.model';

export const loadFilms = createAction(
  '[Films] Load Films'
);

export const loadFilmsSuccess = createAction(
  '[Films] Load Films Success',
  props<{ films: Film[] }>()
);

