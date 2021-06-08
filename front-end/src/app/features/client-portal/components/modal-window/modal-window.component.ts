import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../../../core/services/authorization.service';
@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnDestroy {
  isLogin;
  subscription$: Subscription;

  constructor(private authorizationService: AuthorizationService) {
    this.subscription$ = this.authorizationService.getIsLogin().subscribe(
      value => this.isLogin = value
    )
  }

  showLoginForm() {
    this.authorizationService.setIsLogin(true);
  }

  showRegistrationForm() {
    this.authorizationService.setIsLogin(false);
  }

  hideModalWindow() {
    this.authorizationService.setModalWindowVisibility(false);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
