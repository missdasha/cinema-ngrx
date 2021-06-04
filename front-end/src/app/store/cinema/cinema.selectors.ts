import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CinemaState } from './cinema.state';
import { State } from '../state';
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

export const selectSuccessMessage = createSelector(
  selectCinemasState,
  (cinemaState: CinemaState) => cinemaState.successMessage
);

export const selectError = createSelector(
  selectCinemasState,
  (cinemaState: CinemaState) => cinemaState.error
);

