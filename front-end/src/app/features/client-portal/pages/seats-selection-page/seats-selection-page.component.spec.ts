import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsSelectionPageComponent } from './seats-selection-page.component';

describe('SeatsSelectionPageComponent', () => {
  let component: SeatsSelectionPageComponent;
  let fixture: ComponentFixture<SeatsSelectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatsSelectionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsSelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
