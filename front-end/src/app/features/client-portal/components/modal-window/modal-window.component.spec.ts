import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ModalWindowComponent } from './modal-window.component';

fdescribe('ModalWindowComponent', () => {
  let adminPageComponent: ModalWindowComponent;
  let fixture: ComponentFixture<ModalWindowComponent>;
  let ordersPage: HTMLElement;

  beforeEach(async () => {
    const authorizationService = jasmine.createSpyObj('AuthorizationService', ['setIsLogin', 'getIsLogin']);
    TestBed.configureTestingModule({
      declarations: [ ModalWindowComponent ],
      providers: [{ provide: AuthorizationService, useValue: authorizationService }]
    });
    fixture = TestBed.createComponent(ModalWindowComponent);
    adminPageComponent = fixture.componentInstance;
    ordersPage = fixture.nativeElement;
    fixture.detectChanges();
  });

  xit('should change isLogin variable to false after showRegistrationForm()', () => {
    adminPageComponent.showRegistrationForm();
    expect(adminPageComponent.isLogin).toBeFalse();
  });

  xit('should change isLogin variable to true after showLoginForm()', () => {
    adminPageComponent.isLogin = false;
    adminPageComponent.showLoginForm();
    expect(adminPageComponent.isLogin).toBeTrue();
  });
});
