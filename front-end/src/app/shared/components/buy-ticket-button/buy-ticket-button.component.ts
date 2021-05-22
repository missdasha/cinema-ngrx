import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-buy-ticket-button',
  templateUrl: './buy-ticket-button.component.html',
  styleUrls: ['./buy-ticket-button.component.scss']
})
export class BuyTicketButtonComponent {
  @Input() textOnButton: string;
  @Output() onBuyTicket = new EventEmitter();

  buyTicket() {
    this.onBuyTicket.emit();
  }
}
