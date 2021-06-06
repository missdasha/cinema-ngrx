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

export const selectFilmById = (id: string) => {
  return createSelector(
    selectFilms,
    (films: Film[]) => {
      return films.find((film: Film) => film._id === id);
    }
  );
}; 

export const selectNewestFilms = createSelector(
  selectFilmsWithSeances,
  (films: Film[]) => JSON.parse(JSON.stringify(films))
                            .sort((a, b) => a.startDate > b.startDate ? -1 : 1)
                            .slice(0, 3)
);

export const selectSuccessMessage = createSelector(
  selectFilmsState,
  (filmState: FilmState) => filmState.successMessage
);

export const selectError = createSelector(
  selectFilmsState,
  (filmState: FilmState) => filmState.error
);