import { createAction, props } from '@ngrx/store';
import { Film } from 'src/app/core/models/film.model';

export const loadFilms = createAction(
  '[Film] Load Films'
);

export const loadFilmsSuccess = createAction(
  '[Film] Load Films Success',
  props<{ films: Film[] }>()
);