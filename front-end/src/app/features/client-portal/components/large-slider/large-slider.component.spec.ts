import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeSliderComponent } from './large-slider.component';

describe('LargeSliderComponent', () => {
  let component: LargeSliderComponent;
  let fixture: ComponentFixture<LargeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
