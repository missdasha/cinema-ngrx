import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { CinemaService } from 'src/app/core/services/cinema.service';
import { FilmService } from '../../core/services/film.service';
import { loadCinemas, loadCinemasSuccess } from './cinema.actions';

@Injectable()
export class CinemaEffects {
  loadCinemas$ = createEffect(() => this.actions$.pipe(
    ofType(loadCinemas),
    mergeMap(() => this.cinemaService.getCinemasFullInfo()
      .pipe(
        tap((cinemas) => console.log(cinemas)),
        map(cinemas => ({ type: loadCinemasSuccess.type, cinemas })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private cinemaService: CinemaService,
  ) { }
}