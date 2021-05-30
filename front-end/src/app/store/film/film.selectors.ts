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

export const selectAllFilmsTitles = createSelector(
  selectFilms,
  (films: Film[]) => films.map((film: Film) => film.title)
);

export const selectFilm = createSelector(
  selectFilmsState,
  (filmState: FilmState) => filmState.film
);

export const selectFilmById = (id: string) => {
  return createSelector(
    selectFilms,
    (films: Film[]) => films.find((film: Film) => film._id === id)
  )
}; 

export const selectFilmsWithGivenFieldsAndSeances = (fields: string) => {
  return createSelector(
    selectFilmsWithSeances,
    (films: Film[]) => {
      const fieldsArray = fields.split(',');
      return films.map((film: Film) => {
        const newFilm = {};
        fieldsArray.forEach((field: string) => {
          newFilm[field] = film[field];
        });
        return newFilm;
      });
    }
  );
};

export const selectFilmsWithGivenFields = (fields: string) => {
  return createSelector(
    selectFilms,
    (films: Film[]) => {
      const fieldsArray = fields.split(',');
      return films.map((film: Film) => {
        const newFilm = {};
        fieldsArray.forEach((field: string) => {
          newFilm[field] = film[field];
        });
        return newFilm;
      });
    }
  );
};