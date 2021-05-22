import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTicketButtonComponent } from './buy-ticket-button.component';

describe('BuyTicketButtonComponent', () => {
  let component: BuyTicketButtonComponent;
  let fixture: ComponentFixture<BuyTicketButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyTicketButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTicketButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
