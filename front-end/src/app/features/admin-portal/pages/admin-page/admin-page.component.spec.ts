import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPageComponent } from './admin-page.component';

fdescribe('AdminPageComponent', () => {
  let adminPageComponent: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;
  let ordersPage: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AdminPageComponent ]
    });
    fixture = TestBed.createComponent(AdminPageComponent);
    adminPageComponent = fixture.componentInstance;
    ordersPage = fixture.nativeElement;
    fixture.detectChanges();
  });

  fit('should change chosenForm variable when the form is chosen', () => {
    const formName = 'Фильмы';
    adminPageComponent.showForm(formName);
    expect(adminPageComponent.chosenForm).toBe(formName);
  });
});
