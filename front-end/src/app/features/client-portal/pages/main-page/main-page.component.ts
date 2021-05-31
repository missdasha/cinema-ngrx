import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { filmSelectors, RootStoreState } from 'src/app/store';
import { Film } from '../../../../core/models/film.model';
import { FilmService } from '../../../../core/services/film.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject();
  films: Film[] = [];
  newestFilms: Film[] = [];

  constructor(
    private filmService: FilmService, 
    private router: Router, 
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {
    this.store$.select(filmSelectors.selectFilmsWithGivenFieldsAndSeances('_id,title,genres,age,imageSrc'))
      .pipe(
        takeUntil(this.notifier$),
        filter((films: Film[]) => !!films.length)
      )
      .subscribe((films: Film[]) => {
        this.films = films;
      });

    this.store$.select(filmSelectors.selectNewestFilms)
      .pipe(takeUntil(this.notifier$),filter((films: Film[]) => !!films.length))
      .subscribe((films: Film[]) => {
          this.newestFilms = films;
          console.log(this.newestFilms);
        }
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
