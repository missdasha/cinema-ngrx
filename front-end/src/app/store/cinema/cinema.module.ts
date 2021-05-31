import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cinemaReducer } from './cinema.reducers';
import { CinemaEffects } from './cinema.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('cinemas', cinemaReducer),
    EffectsModule.forFeature([CinemaEffects])
  ]
})
export class CinemaModule { }
