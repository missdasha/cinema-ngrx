import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FilmState } from './film.state';
import { State } from '../state';
import { Film } from 'src/app/core/models/film.model';
import { chooseFields } from 'src/app/shared/utils/utils';

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
    (films: Film[]) => {
      console.log(films);
      return films.find((film: Film) => film._id === id);
    }
  );
}; 

export const selectFilmsWithGivenFieldsAndSeances = (fields: string) => {
  return createSelector(
    selectFilmsWithSeances,
    (films: Film[]) => chooseFields(fields, films)
  );
};

export const selectFilmsWithGivenFields = (fields: string) => {
  return createSelector(
    selectFilms,
    (films: Film[]) => chooseFields(fields, films)
  );
};

export const selectNewestFilms = createSelector(
  selectFilmsWithSeances,
  (films: Film[]) => {
    const fields = '_id,title,genres,age,imageSrc';
    const newestFilms = JSON.parse(JSON.stringify(films))
                            .sort((a, b) => a.startDate > b.startDate ? -1 : 1)
                            .slice(0, 3);
    return chooseFields(fields, newestFilms);
  }
);

