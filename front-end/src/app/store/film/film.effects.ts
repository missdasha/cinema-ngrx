import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { FilmService } from '../../core/services/film.service';
import { loadFilms, loadFilmsSuccess } from './film.actions';
 
@Injectable()
export class FilmEffects {
  loadFilms$ = createEffect(() => this.actions$.pipe(
    ofType(loadFilms),
    mergeMap(() => this.filmService.getFilms()
      .pipe(
        map(films => ({ type: loadFilmsSuccess.type, films: films })),
        catchError(() => EMPTY)
      ))
    )
  );
  constructor(
    private actions$: Actions,
    private filmService: FilmService
  ) { }
}