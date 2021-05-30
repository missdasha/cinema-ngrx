import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap, filter, first } from 'rxjs/operators';
import { Film } from 'src/app/core/models/film.model';
import { RootStoreState } from '..';
import { FilmService } from '../../core/services/film.service';
import { loadFilmById, loadFilmByIdAndQuery, loadFilms, loadFilmsForAfisha, loadFilmsSuccess, loadFilmSuccess } from './film.actions';
import { selectFilm } from './film.selectors';

@Injectable()
export class FilmEffects {
  loadFilms$ = createEffect(() => this.actions$.pipe(
    ofType(loadFilms),
    mergeMap(() => this.filmService.getFilmsFullInfo()
      .pipe(
        tap((films) => console.log(films)),
        map(films => ({ type: loadFilmsSuccess.type, films })),
        catchError(() => EMPTY)
      ))
    )
  );

  loadFilmsForAfisha$ = createEffect(() => this.actions$.pipe(
    ofType(loadFilmsForAfisha),
    mergeMap(() => this.filmService.getFilmsForAfisha()
      .pipe(
        tap((films) => console.log(films)),
        map(films => ({ type: loadFilmsSuccess.type, films })),
        catchError(() => EMPTY)
      ))
    )
  );

  loadFilmById$ = createEffect(() => this.actions$.pipe(
    ofType(loadFilmById),
    mergeMap(({ id }) => this.filmService.getFilmById(id)
      .pipe(
        tap((film) => console.log(film)),
        map(film => ({ type: loadFilmSuccess.type, film })),
        catchError(() => EMPTY)
      )))
  );

  loadFilmByIdAndQuery$ = createEffect(() => this.actions$.pipe(
    ofType(loadFilmByIdAndQuery),
    mergeMap(({ id }) =>
      this.store$.pipe(
        select(selectFilm),
        tap((film) => console.log(film)),
        first(),
        map((film: Film)=> [id, film])
      )
    ),
    filter(([id, film]: [string, Film]) => (film && film._id !== id) || !film),
    mergeMap(([id]) => this.filmService.getFilmByIdAndQuery(id)
      .pipe(
        tap((film) => console.log(film)),
        map(film => ({ type: loadFilmSuccess.type, film })),
        catchError(() => EMPTY)
      )))
  );

  constructor(
    private actions$: Actions,
    private filmService: FilmService,
    private store$: Store<RootStoreState.State>
  ) { }
}