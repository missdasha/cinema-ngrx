import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CinemaFormComponent } from './components/cinema-form/cinema-form.component';
import { FilmFormComponent } from './components/film-form/film-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SeanceFormComponent } from './components/seance-form/seance-form.component';

@NgModule({
  declarations: [AdminPageComponent, ServiceFormComponent, CinemaFormComponent, FilmFormComponent, SeanceFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminPortalModule { }
