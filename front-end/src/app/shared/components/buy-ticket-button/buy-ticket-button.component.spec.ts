import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTicketButtonComponent } from './buy-ticket-button.component';

describe('BuyTicketButtonComponent class only', () => {
  let button: BuyTicketButtonComponent;
  let fixture: ComponentFixture<BuyTicketButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [ BuyTicketButtonComponent ] });
    fixture = TestBed.createComponent(BuyTicketButtonComponent);
    button = fixture.componentInstance;
  });

  it('raises the onBuyTicket event when clicked (element.click)', () => {
    button.onBuyTicket.subscribe((emittedValue: undefined) => {
      expect(emittedValue).toBeUndefined();
    });
    button.buyTicket();
  });

  it('raises the onBuyTicket event when clicked (triggerEventHandler)', () => {
    const buttonDebugElement: DebugElement = fixture.debugElement;
    button.onBuyTicket.subscribe((emittedValue: undefined) => {
      expect(emittedValue).toBeUndefined();
    });
    buttonDebugElement.triggerEventHandler('click', null);
  });
  
  it('should display the text from @Input parameter', () => {
    const buttonElement: HTMLElement = fixture.nativeElement;
    button.textOnButton = 'Buy a ticket';
    fixture.detectChanges();
    expect(buttonElement.textContent).toBe(button.textOnButton);
  });
});
