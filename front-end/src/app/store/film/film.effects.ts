import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap, withLatestFrom, filter, first } from 'rxjs/operators';
import { Film } from 'src/app/core/models/film.model';
import { RootStoreState } from '..';
import { FilmService } from '../../core/services/film.service';
import { loadFilmById, loadFilms, loadFilmsForAfisha, loadFilmsSuccess, loadFilmSuccess } from './film.actions';
import { selectFilm } from './film.selectors';

@Injectable()
export class FilmEffects {
  loadFilms$ = createEffect(() => this.actions$.pipe(
    ofType(loadFilms),
    mergeMap(() => this.filmService.getFilms()
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
    // map((action) => action.id),
    // tap((id) => console.log(id)),
    // withLatestFrom(action =>
    //     this.store$.select(selectFilm)
    // ),
    // withLatestFrom(action =>
    //   of(action).pipe(
    //     this.store$.pipe(this.store$.select(selectFilm))
    //   )
    // ),
    // filter(([{id}, film]) => film.id !== id),
    // mergeMap((id) => this.filmService.getFilmById(id)
    //   .pipe(
    //     tap((film) => console.log(film)),
    //     map(film => ({ type: loadFilmSuccess.type, film })),
    //     catchError(() => EMPTY)
    //   ))
    // )
    mergeMap(({ id }) =>
      this.store$.pipe(
        select(selectFilm),
        tap((film) => console.log(film)),
        first(),
        map((film: Film)=> [id, film])
      )
    ),
    filter(([id, film]: [string, Film]) => (film && film._id !== id) || !film),
    mergeMap(([id]) => this.filmService.getFilmById(id)
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