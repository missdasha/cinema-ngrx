import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyTicketButtonComponent } from './components/buy-ticket-button/buy-ticket-button.component';
import { MomentPipe } from './pipes/moment.pipe';

@NgModule({
  declarations: [
    BuyTicketButtonComponent, MomentPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BuyTicketButtonComponent,
    MomentPipe
  ]
})
export class SharedModule { }
