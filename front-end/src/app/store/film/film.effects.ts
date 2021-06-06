import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FilmService } from 'src/app/core/services/film.service';
import { addFilm, addFilmFailure, addFilmSuccess, loadFilms, loadFilmsSuccess } from './film.actions';

@Injectable()
export class FilmEffects {
  loadFilms$ = createEffect(() => this.actions$.pipe(
    ofType(loadFilms),
    mergeMap(() => this.filmService.getFilmsFullInfo()
      .pipe(
        map(films => ({ type: loadFilmsSuccess.type, films })),
        catchError(() => EMPTY)
      ))
    )
  );

  addFilm$ = createEffect(() => this.actions$.pipe(
    ofType(addFilm),
    mergeMap(({ film }) => this.filmService.postFilm(film)
      .pipe(
        map(({ film, message}) => ({ type: addFilmSuccess.type, film, message })),
        catchError(error => of({ type: addFilmFailure.type, error }))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private filmService: FilmService,
  ) { }
}