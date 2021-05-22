import { Component, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthorizationService } from '../app/core/services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private notifier$ = new Subject();
  isModalWindowVisible: boolean;
  isSearchWindowVisible = false;

  constructor(private authorizationService: AuthorizationService) {
    this.authorizationService.getIsModalWindowVisible().pipe(takeUntil(this.notifier$))
      .subscribe(
        value => this.isModalWindowVisible = value
      );
    moment.locale('ru');
  }

  ngOnDestroy() {
    this.notifier$.next();
  }

  openSearchWindow() {
    this.isSearchWindowVisible = true;
  }

  hideSearchWindow() {
    this.isSearchWindowVisible = false;
  }
}
