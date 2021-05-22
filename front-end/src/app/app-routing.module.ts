import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { OrdersGuard } from './core/guards/orders.guard';
import { AdminPageComponent } from './features/admin-portal/pages/admin-page/admin-page.component';
import { AfishaPageComponent } from './features/client-portal/pages/afisha-page/afisha-page.component';
import { CinemasPageComponent } from './features/client-portal/pages/cinemas-page/cinemas-page.component';
import { FilmDetailsPageComponent } from './features/client-portal/pages/film-details-page/film-details-page.component';
import { MainPageComponent } from './features/client-portal/pages/main-page/main-page.component';
import { OrdersPageComponent } from './features/client-portal/pages/orders-page/orders-page.component';
import { SeatsSelectionPageComponent } from './features/client-portal/pages/seats-selection-page/seats-selection-page.component';

const routes: Routes = [
  { path: 'cinemas', component: CinemasPageComponent},
  { path: 'orders', component: OrdersPageComponent, canActivate: [OrdersGuard]},
  { path: 'afisha/details', component: FilmDetailsPageComponent },
  { path: 'afisha/seats', component: SeatsSelectionPageComponent },
  { path: 'afisha', component: AfishaPageComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
  { path: '', component: MainPageComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
