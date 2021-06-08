import { createReducer, on } from '@ngrx/store';
import { initialFilmState } from "./film.state";
import { addFilmFailure, addFilmSuccess, addSeanceFailure, addSeanceSuccess, loadFilmsSuccess, reset } from './film.actions';
import { Film } from 'src/app/core/models/film.model';

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
  on(reset, (state) => ({ ...state, successMessage: '', error: null})),
  on(addSeanceSuccess, (state, { seance, message }) => {
    const filmIndex = state.films.findIndex((film: Film) => film._id === seance.film);
    const filmWithNewSeance = JSON.parse(JSON.stringify(state.films[filmIndex]));
    filmWithNewSeance.seances.push(seance);
    const films = JSON.parse(JSON.stringify(state.films));
    films.splice(filmIndex, 1, filmWithNewSeance);
    films.splice()
    return  { 
              films,
              successMessage: message,
              error: null
            };
  }),
  on(addSeanceFailure, (state, { error }) => ({ ...state, successMessage: '', error }))
);