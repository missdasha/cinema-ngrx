import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FilmState } from './film.state';
import { State } from '../state';
import { Film } from 'src/app/core/models/film.model';

export const selectFilmsState = createFeatureSelector<State, FilmState>('films');

export const selectFilms = createSelector(
  selectFilmsState,
  (filmState: FilmState) => filmState.films
);

export const selectFilmsWithSeances = createSelector(
  selectFilms,
  (films: Film[]) => films.filter((film: Film) => film.seances.length)
);

export const selectFilmsTitles = createSelector(
  selectFilmsWithSeances,
  (films: Film[]) => films.map((film: Film) => film.title)
);