import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private notifier$ = new Subject();
  @Output() showSearch = new EventEmitter();
  isUserAuthorized: boolean;

  constructor(private authorizationService: AuthorizationService) {
     this.authorizationService.getIsUserAuthorized().pipe(takeUntil(this.notifier$))
      .subscribe(
        value => {
          this.isUserAuthorized = value;
        }
      );
  }

  showForm() {
    this.authorizationService.setModalWindowVisibility(true);
  }

  logout() {
    this.authorizationService.logOut();
  }

  showSearchWindow() {
    this.showSearch.emit();
  }
}
