import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { hasSubstring } from 'src/app/shared/utils/utils';
import { Cinema } from '../../models/cinema.model';
import { Film } from '../../models/film.model';
import { CinemaService } from '../../services/cinema.service';
import { FilmService } from '../../services/film.service';

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
  cities: string[];
  foundFilms: string[];
  foundCinemas: string[];
  foundCities: string[];
  searchInput: FormControl = new FormControl();

  constructor(private filmService: FilmService, private cinemaService: CinemaService, private router: Router) { }

  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(takeUntil(this.notifier$), debounceTime(400), distinctUntilChanged())
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

    this.filmService.getFilmsForSearch()
      .pipe(takeUntil(this.notifier$))
      .subscribe(
        (films: Film[]) => {
          this.filmsTitles = films
            .filter((film: Film) => film.seances.length)
            .map((film: Film) => film.title);
        }
      );

    this.cinemaService.getCinemas()
      .pipe(takeUntil(this.notifier$))
      .subscribe(
        (cinemas: Cinema[]) => {
          this.cinemasNames = cinemas.map((cinema: Cinema) => cinema.name);
          this.cities = cinemas.map((cinema: Cinema) => cinema.city);
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
