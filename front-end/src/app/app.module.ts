import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientPortalModule } from './features/client-portal/client-portal.module';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPortalModule } from './features/admin-portal/admin-portal.module';
import { RootStoreModule } from './store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ClientPortalModule,
    AdminPortalModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    RootStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
