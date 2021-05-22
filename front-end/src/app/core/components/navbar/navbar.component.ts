import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthorizationService } from '../../services/authorization.service';
import { roles } from '../../../features/client-portal/сonstants/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject();
  @Output() showSearch = new EventEmitter();
  isUserAuthorized: boolean;
  isAdmin: boolean;

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.authorizationService.getIsUserAuthorized().pipe(takeUntil(this.notifier$))
      .subscribe(
        value => {
          this.isUserAuthorized = value;
          if (value) {
            this.authorizationService.getUserRole().subscribe(
              (({role}) => {
                if (role == roles.admin) {
                  this.isAdmin = true;
                }
              })
            )
          }
        }
      );
  }

  ngOnDestroy() {
    this.notifier$.next();
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
