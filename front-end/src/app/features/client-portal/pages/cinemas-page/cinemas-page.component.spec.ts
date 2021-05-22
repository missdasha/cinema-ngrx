import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemasPageComponent } from './cinemas-page.component';

describe('CinemasPageComponent', () => {
  let component: CinemasPageComponent;
  let fixture: ComponentFixture<CinemasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemasPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
