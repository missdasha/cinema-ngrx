import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/store';
import { cinemaActions, cinemaSelectors } from 'src/app/store/cinema';

@Injectable({
  providedIn: 'root'
})
export class CinemaFacadeService {

  constructor(private store$: Store<RootStoreState.State>) { }

  loadCinemas() {
    this.store$.dispatch(cinemaActions.loadCinemas());
  }

  selectCinemasWithGivenFields(fields: string) {
    return this.store$.select(cinemaSelectors.selectCinemasWithGivenFields(fields));
  }

  selectCinemaByName(name: string) {
    return this.store$.select(cinemaSelectors.selectCinemaByName(name));
  }
}
