import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfishaPageComponent } from './afisha-page.component';

describe('AfishaPageComponent', () => {
  let component: AfishaPageComponent;
  let fixture: ComponentFixture<AfishaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfishaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfishaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
