import { createAction, props } from '@ngrx/store';
import { Film } from 'src/app/core/models/film.model';

export const loadFilms = createAction(
  '[Film] Load Films'
);

export const loadFilmsForAfisha = createAction(
  '[Afisha] Load Films'
);

export const loadFilmById = createAction(
  '[Film] Load Film',
  props<{ id: string }>()
);

export const loadFilmsSuccess = createAction(
  '[Film] Load Films Success',
  props<{ films: Film[] }>()
);

export const loadFilmSuccess = createAction(
  '[Film] Load Film Success',
  props<{ film: Film }>()
);