import { createAction, props } from '@ngrx/store';
import { Film } from 'src/app/core/models/film.model';

export const loadFilms = createAction(
  '[Films] Load Films'
);

export const loadFilmsForAfisha = createAction(
  '[Films] Load Films For Afisha'
);

export const loadFilmById = createAction(
  '[Film] Load Film By Id',
  props<{ id: string }>()
);

export const loadFilmByIdAndQuery = createAction(
  '[Film] Load Film By Id And Query',
  props<{ id: string }>()
);

export const loadFilmsSuccess = createAction(
  '[Films] Load Films Success',
  props<{ films: Film[] }>()
);

export const loadFilmSuccess = createAction(
  '[Film] Load Film Success',
  props<{ film: Film }>()
);
