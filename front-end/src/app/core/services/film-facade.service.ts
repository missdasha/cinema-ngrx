import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filmSelectors, filmActions, RootStoreState } from 'src/app/store';

@Injectable({
  providedIn: 'root'
})
export class FilmFacadeService {

  constructor(private store$: Store<RootStoreState.State>) { }

  loadFilms() {
    this.store$.dispatch(filmActions.loadFilms());
  }

  selectFilmsWithGivenFieldsAndSeances(fields: string) {
    return this.store$.select(filmSelectors.selectFilmsWithGivenFieldsAndSeances(fields));
  }

  selectFilmsWithGivenFields(fields: string) {
    return this.store$.select(filmSelectors.selectFilmsWithGivenFields(fields));
  }

  selectNewestFilms() {
    return this.store$.select(filmSelectors.selectNewestFilms);
  }

  selectFilmById(filmId: string) {
    return this.store$.select(filmSelectors.selectFilmById(filmId));
  }

  selectFilmsTitles() {
    return this.store$.select(filmSelectors.selectFilmsTitles);
  }
}
