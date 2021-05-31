import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CinemaFacadeService } from 'src/app/core/services/cinema-facade.service';
import { FilmFacadeService } from 'src/app/core/services/film-facade.service';
import { hasSubstring } from 'src/app/shared/utils/utils';
import { Cinema } from '../../../../core/models/cinema.model';

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
    private router: Router,
    private filmFacadeService: FilmFacadeService,
    private cinemaFacadeService: CinemaFacadeService
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

    this.filmFacadeService.selectFilmsTitles()
      .subscribe((titles: string[]) => this.filmsTitles = titles);

    this.cinemaFacadeService.selectCinemasWithGivenFields('name,city,address')
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
