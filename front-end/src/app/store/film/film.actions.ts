import { createAction, props } from '@ngrx/store';
import { Film } from 'src/app/core/models/film.model';

export const loadFilms = createAction(
  '[Films] Load Films'
);

export const loadFilmsSuccess = createAction(
  '[Films] Load Films Success',
  props<{ films: Film[] }>()
);

export const addFilm = createAction(
  '[Films] Add Film',
  props<{ film: Film }>()
);

export const addFilmSuccess = createAction(
  '[Films] Add Film Success',
  props<{ film: Film }>()
);

export const addFilmFailure = createAction(
  '[Films] Add Film Failure',
  props<{ message: any }>()
);
