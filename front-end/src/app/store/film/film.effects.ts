import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Seance } from 'src/app/core/models/seance.model';
import { FilmService } from 'src/app/core/services/film.service';
import { SeanceService } from 'src/app/core/services/seance.service';
import { addFilm, addFilmFailure, addFilmSuccess, addSeance, addSeanceFailure, addSeanceSuccess, loadFilms, loadFilmsSuccess } from './film.actions';

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
  
  addSeance$ = createEffect(() => this.actions$.pipe(
    ofType(addSeance),
    mergeMap(({ seance }) => this.seanceService.postSeance(seance).pipe(
        switchMap(({ seance, message }) => this.seanceService.getSeance(seance._id).pipe(
          mergeMap((seance: Seance) => of({ type: addSeanceSuccess.type, seance, message })),
          catchError(error => of({ type: addFilmFailure.type, error }))
        )),
        catchError(error => of({ type: addFilmFailure.type, error }))
      )
    ))
  );
  
  constructor(
    private actions$: Actions,
    private filmService: FilmService,
    private seanceService: SeanceService
  ) { }
}