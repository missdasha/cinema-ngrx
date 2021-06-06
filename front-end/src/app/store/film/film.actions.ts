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
  props<{ film: FormData }>()
);

export const addFilmSuccess = createAction(
  '[Films] Add Film Success',
  props<{ film: Film, message: string }>()
);

export const addFilmFailure = createAction(
  '[Films] Add Film Failure',
  props<{ error: any }>()
);

export const reset = createAction(
  '[Films] Reset Message and Error'
);
