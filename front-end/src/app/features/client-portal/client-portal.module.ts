import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LargeSliderComponent } from './components/large-slider/large-slider.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './authorization-forms/login-form/login-form.component';
import { RegistrationFormComponent } from './authorization-forms/registration-form/registration-form.component';
import { AfishaPageComponent } from './pages/afisha-page/afisha-page.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FilterComponent } from './components/filter/filter.component';
import { SeatsSelectionPageComponent } from './pages/seats-selection-page/seats-selection-page.component';
import { SearchComponent } from './components/search/search.component';
import { FilmDetailsPageComponent } from './pages/film-details-page/film-details-page.component';
import { CinemasPageComponent } from './pages/cinemas-page/cinemas-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    LargeSliderComponent,
    FilmCardComponent,
    ModalWindowComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    AfishaPageComponent,
    FiltersComponent,
    FilterComponent,
    SeatsSelectionPageComponent,
    SearchComponent,
    FilmDetailsPageComponent,
    CinemasPageComponent,
    OrdersPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    MainPageComponent,
    AfishaPageComponent,
    SeatsSelectionPageComponent,
    LargeSliderComponent,
    FilmCardComponent,
    ModalWindowComponent,
    SearchComponent,
    CinemasPageComponent,
    OrdersPageComponent
  ]
})
export class ClientPortalModule { }
