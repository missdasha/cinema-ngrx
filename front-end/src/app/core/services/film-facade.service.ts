import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filmSelectors, filmActions, RootStoreState } from 'src/app/store';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root'
})
export class FilmFacadeService {

  constructor(private store$: Store<RootStoreState.State>) { }

  loadFilms() {
    this.store$.dispatch(filmActions.loadFilms());
  }

  selectFilms(): Observable<Film[]> {
    return this.store$.select(filmSelectors.selectFilms);
  }

  selectFilmsWithSeances(): Observable<Film[]> {
    return this.store$.select(filmSelectors.selectFilmsWithSeances);
  }

  selectNewestFilms(): Observable<Film[]> {
    return this.store$.select(filmSelectors.selectNewestFilms);
  }

  selectFilmById(filmId: string): Observable<Film> {
    return this.store$.select(filmSelectors.selectFilmById(filmId));
  }

  selectFilmsTitles(): Observable<string[]> {
    return this.store$.select(filmSelectors.selectFilmsTitles);
  }

  addFilm(film: FormData) {
    this.store$.dispatch(filmActions.addFilm({ film }));
  }

  selectSuccessMessage(): Observable<string> {
    return this.store$.select(filmSelectors.selectSuccessMessage);
  }

  selectError(): Observable<any> {
    return this.store$.select(filmSelectors.selectError);
  }

  reset() {
    this.store$.dispatch(filmActions.reset());
  }
}
