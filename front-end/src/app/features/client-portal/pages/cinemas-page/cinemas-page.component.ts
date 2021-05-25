import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cinema } from '../../../../core/models/cinema.model';
import { CinemaService } from '../../../../core/services/cinema.service';

@Component({
  selector: 'app-cinemas-page',
  templateUrl: './cinemas-page.component.html',
  styleUrls: ['./cinemas-page.component.scss']
})
export class CinemasPageComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject();
  cinemas: Cinema[];

  constructor(private cinemaService: CinemaService, private router: Router) { }

  ngOnInit() {
    this.cinemaService.getCinemas()
      .pipe(takeUntil(this.notifier$))
      .subscribe(
        (cinemas: Cinema[]) => {
          this.cinemas = cinemas;
        }
      );
  }

  ngOnDestroy() {
    this.notifier$.next();
  }

  showAfisha(cinema: string) {
    this.router.navigate(['/afisha'], {
      queryParams: {
        cinema
      }
    });
  }
}
