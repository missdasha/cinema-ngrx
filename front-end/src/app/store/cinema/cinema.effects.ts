import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CinemaService } from 'src/app/core/services/cinema.service';
import { addCinema, addCinemaFailure, addCinemaSuccess, loadCinemas, loadCinemasSuccess } from './cinema.actions';

@Injectable()
export class CinemaEffects {
  loadCinemas$ = createEffect(() => this.actions$.pipe(
    ofType(loadCinemas),
    mergeMap(() => this.cinemaService.getCinemasFullInfo()
      .pipe(
        map(cinemas => ({ type: loadCinemasSuccess.type, cinemas })),
        catchError(() => EMPTY)
      ))
    )
  );

  addCinema$ = createEffect(() => this.actions$.pipe(
    ofType(addCinema),
    mergeMap(({ cinema }) => this.cinemaService.postCinema(cinema)
      .pipe(
        map(({ data, message}) => ({ type: addCinemaSuccess.type, data, message })),
        catchError(err => of({ type: addCinemaFailure.type, error: err }))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private cinemaService: CinemaService,
  ) { }
}