import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Film } from '../../models/film.model';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject();
  films: Film[] = [];
  newestFilms: Film[] = [];

  constructor(private filmService: FilmService, private router: Router) { }

  ngOnInit() {
    this.filmService.getFilmsForSlider()
    .pipe(takeUntil(this.notifier$))
    .subscribe(
      (films: Film[]) => {
        this.films = films.filter((film: Film) => film.seances.length);
      },
      (e) => console.error(e)
    );

    this.filmService.getNewestFilms()
    .pipe(takeUntil(this.notifier$))
    .subscribe(
      (films: Film[]) => {
        this.newestFilms = films.filter((film: Film) => film.seances.length);
      },
      (e) => console.error(e)
    );
  }

  ngOnDestroy() {
    this.notifier$.next();
  }

  showMore(film: Film) {
    this.router.navigate(['/afisha'], {
      queryParams: {
        film: film.title
      }
    });
  }
}
