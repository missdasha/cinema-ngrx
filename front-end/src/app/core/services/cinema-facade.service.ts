import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootStoreState } from 'src/app/store';
import { cinemaActions, cinemaSelectors } from 'src/app/store/cinema';
import { Cinema } from '../models/cinema.model';

@Injectable({
  providedIn: 'root'
})
export class CinemaFacadeService {

  constructor(private store$: Store<RootStoreState.State>) { }

  loadCinemas() {
    this.store$.dispatch(cinemaActions.loadCinemas());
  }

  selectCinemas(): Observable<Cinema[]> {
    return this.store$.select(cinemaSelectors.selectCinemas);
  }

  selectCinemaByName(name: string): Observable<Cinema> {
    return this.store$.select(cinemaSelectors.selectCinemaByName(name));
  }

  addCinema(cinema: Cinema) {
    this.store$.dispatch(cinemaActions.addCinema({ cinema }));
  }

  selectSuccessMessage(): Observable<string> {
    return this.store$.select(cinemaSelectors.selectSuccessMessage);
  }

  selectError(): Observable<any> {
    return this.store$.select(cinemaSelectors.selectError);
  }

  reset() {
    this.store$.dispatch(cinemaActions.reset());
  }
}
