import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { filmReducer } from './film.reducers';
import { EffectsModule } from '@ngrx/effects';
import { FilmEffects } from './film.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('films', filmReducer),
    EffectsModule.forFeature([FilmEffects])
  ]
})
export class FilmModule { }
