import { createReducer, on } from '@ngrx/store';
import { initialFilmState } from "./film.state";
import { loadFilmsSuccess } from './film.actions';

export const filmReducer = createReducer(
  initialFilmState,
  on(loadFilmsSuccess, (state, { films }) => ({ ...state, films })),
);