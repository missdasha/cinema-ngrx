import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CinemaState } from './cinema.state';
import { State } from '../state';
import { Film } from 'src/app/core/models/film.model';
import { chooseFields } from 'src/app/shared/utils/utils';
import { Cinema } from 'src/app/core/models/cinema.model';

export const selectCinemasState = createFeatureSelector<State, CinemaState>('cinemas');

export const selectCinemas = createSelector(
  selectCinemasState,
  (cinemaState: CinemaState) => cinemaState.cinemas
);

export const selectCinemaByName = (name: string) => {
  return createSelector(
    selectCinemas,
    (cinemas: Cinema[]) => {
      return cinemas.find((cinema: Cinema) => cinema.name === name);
    }
  );
}; 

export const selectCinemasWithGivenFields = (fields: string) => {
  return createSelector(
    selectCinemas,
    (cinemas: Cinema[]) => chooseFields(fields, cinemas)
  );
};



