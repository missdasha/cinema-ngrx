import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { hasSubstring } from 'src/app/shared/utils/utils';
import { filmSelectors, RootStoreState } from 'src/app/store';
import { Cinema } from '../../../../core/models/cinema.model';
import { Film } from '../../../../core/models/film.model';
import { CinemaService } from '../../../../core/services/cinema.service';
import { FilmService } from '../../../../core/services/film.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() hideSearch = new EventEmitter();
  private notifier$ = new Subject();
  filmsTitles: string[];
  cinemasNames: string[];
  cities: string[] = [];
  foundFilms: string[];
  foundCinemas: string[];
  foundCities: string[];
  searchInput: FormControl = new FormControl();

  constructor(
    private cinemaService: CinemaService, 
    private router: Router,
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.notifier$))
      .subscribe(value => {
        if (value) {
          this.search(value);
        }
        else {
          this.foundFilms = [];
          this.foundCinemas = [];
          this.foundCities = [];
        }
      });

    this.store$.select(filmSelectors.selectFilmsTitles)
      .subscribe((titles: string[]) => this.filmsTitles = titles);

    this.cinemaService.getCinemas()
      .pipe(takeUntil(this.notifier$))
      .subscribe(
        (cinemas: Cinema[]) => {
          this.cinemasNames = cinemas.map((cinema: Cinema) => cinema.name);
          cinemas.forEach((cinema: Cinema) => {
            if (!this.cities.includes(cinema.city)) {
              this.cities.push(cinema.city);
            }
          });
        }
      );
  }

  ngOnDestroy() {
    this.notifier$.next();
  }

  hideSearchWindow() {
    this.hideSearch.emit();
  }

  search(value: string) {
    this.foundFilms = this.filmsTitles.filter((title: string) => hasSubstring(title, value));
    this.foundCinemas = this.cinemasNames.filter((name: string) => hasSubstring(name, value));
    this.foundCities = this.cities.filter((city: string) => hasSubstring(city, value));
  }

  chooseFilm(film: string) {
    this.hideSearch.emit();
    this.router.navigate(['/afisha'], {
      queryParams: {
        film
      }
    });
  }

  chooseCinema(cinema: string) {
    this.hideSearch.emit();
    this.router.navigate(['/afisha'], {
      queryParams: {
        cinema
      }
    });
  }

  chooseCity(city: string) {
    this.hideSearch.emit();
    this.router.navigate(['/afisha'], {
      queryParams: {
        city
      }
    });
  }
}
