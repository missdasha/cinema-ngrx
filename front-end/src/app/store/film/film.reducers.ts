import { createReducer, on } from '@ngrx/store';
import { initialFilmState } from "./film.state";
import { addFilmFailure, addFilmSuccess, loadFilmsSuccess, reset } from './film.actions';

export const filmReducer = createReducer(
  initialFilmState,
  on(loadFilmsSuccess, (state, { films }) => ({ ...state, films })),
  on(addFilmSuccess, (state, { film, message }) => {
    const newFilm = JSON.parse(JSON.stringify(film));
    newFilm.seances = []
    return  { 
              films: JSON.parse(JSON.stringify(state.films)).concat(newFilm),
              successMessage: message,
              error: null
            };
  }),
  on(addFilmFailure, (state, { error }) => ({ ...state, successMessage: '', error })),
  on(reset, (state) => ({ ...state, successMessage: '', error: null}))
);