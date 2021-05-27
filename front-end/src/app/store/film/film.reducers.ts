import { createReducer, on } from '@ngrx/store';
import { initialFilmState } from "./film.state";
import { loadFilmsSuccess, loadFilmsForAfisha, loadFilmSuccess } from './film.actions';
import { state } from '@angular/animations';

export const filmReducer = createReducer(
  initialFilmState,
  on(loadFilmsSuccess, (state, { films }) => ({ ...state, films })),
  on(loadFilmSuccess, (state, { film }) => ({ ...state, film }))
);