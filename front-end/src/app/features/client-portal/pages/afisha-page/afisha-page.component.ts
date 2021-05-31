import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilmFacadeService } from 'src/app/core/services/film-facade.service';
import { Cinema } from '../../../../core/models/cinema.model';
import { Film } from '../../../../core/models/film.model';
import { Seance } from '../../../../core/models/seance.model';
import { CinemaService } from '../../../../core/services/cinema.service';

export const defaultControlsValues = {
  city: 'Все города',
  cinema: 'Все кинотеатры',
  film: 'Все фильмы',
  seance: 'Все сеансы'
};

@Component({
  selector: 'app-afisha-page',
  templateUrl: './afisha-page.component.html',
  styleUrls: ['./afisha-page.component.scss']
})
export class AfishaPageComponent implements OnInit, OnDestroy {
  private films: Film[] = [];
  private notifier$ = new Subject();

  formControlsConfig: { [key: string]: string } = {
    city: defaultControlsValues.city,
    cinema: defaultControlsValues.cinema,
    film: defaultControlsValues.film,
    date: this.getToday(),
    seance: defaultControlsValues.seance
  };
  filteredFilms: Film[] = [];
  filmsTitles: string[];
  cinemas: Cinema[];

  constructor(
    private cinemaService: CinemaService,
    private route: ActivatedRoute,
    private router: Router,
    private filmFacadeService: FilmFacadeService
  ) { }

  ngOnInit() {
    this.route.queryParams
    .pipe(takeUntil(this.notifier$))
    .subscribe(queryParam => {
      if (queryParam.film) {
        this.formControlsConfig = { ...this.formControlsConfig, film: queryParam.film };
      }
      if (queryParam.cinema) {
        this.formControlsConfig = { ...this.formControlsConfig, cinema: queryParam.cinema };
      }
      if (queryParam.city) {
        this.formControlsConfig = { ...this.formControlsConfig, city: queryParam.city };
      }
    });

    this.filmFacadeService.selectFilmsWithGivenFieldsAndSeances('_id,title,genres,age,imageSrc,seances')
      .pipe(takeUntil(this.notifier$))
      .subscribe((films: Film[]) => {
        if (films.length) {
          this.films = films;
          this.filterFilms(this.formControlsConfig);
          this.filmsTitles = this.films.map((film: Film) => film.title);
        }
      });

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

  filterFilms(chosenVariants) {
    this.filteredFilms = JSON.parse(JSON.stringify(this.films))
      .filter((film: Film) => this.filterByFilmTitle(chosenVariants.film, film))
      .filter((film: Film) => {
        const seances = film.seances.filter(seance => this.filterByCity(chosenVariants.city, seance.cinema.city) &&
          this.filterByCinema(chosenVariants.cinema, seance.cinema.name) &&
          this.filterByDate(chosenVariants.date, seance.startTime) &&
          this.filterByTime(chosenVariants.seance, seance.startTime)
        );
        if (seances.length) {
          film.seances = seances;
          return true;
        }
        return false;
      });
  }

  filterByFilmTitle(chosenVariant: string, film: Film): boolean {
    return chosenVariant === defaultControlsValues.film ? true : film.title === chosenVariant;
  }

  filterByCity(chosenVariant: string, city: string): boolean {
    return chosenVariant === defaultControlsValues.city ? true : city === chosenVariant;
  }

  filterByCinema(chosenVariant: string, cinema: string): boolean {
    return chosenVariant === defaultControlsValues.cinema ? true : cinema === chosenVariant;
  }

  filterByDate(chosenVariant: string, time: number): boolean {
    return chosenVariant === moment.unix(time).format('D MMMM');
  }

  filterByTime(chosenVariant: string, time: number): boolean {
    if (moment().unix() >= time) {
      return false;
    }
    if (chosenVariant === defaultControlsValues.seance) {
      return true;
    }
    const [rangeStart, , rangeEnd] = chosenVariant.split(' ');
    const [startHours, startMinutes] = rangeStart.split(':');
    const [endHours, endMinutes] = rangeEnd.split(':');
    const hours = new Date(time * 1000).getHours();
    const minutes = new Date(time * 1000).getMinutes();
    const filmStartTime = moment({ hour: hours, minute: minutes });
    const rangeStartTime = moment({ hour: +startHours, minute: +startMinutes });
    const rangeEndTime = moment({ hour: +endHours, minute: +endMinutes });
    return filmStartTime.isBetween(rangeStartTime, rangeEndTime, 'minutes', '[]');
  }

  chooseSeance(identifiers: { filmId: string, seanceId: string }) {
    const { filmId, seanceId } = identifiers;
    this.router.navigate(['/afisha/seats'], {
      queryParams: {
        filmId,
        seanceId
      }
    });
  }

  showMore(film: Film) {
    this.router.navigate(['/afisha/details'], {
      queryParams: {
        filmId: film._id,
        seancesIds: film.seances.map((seance: Seance) => seance._id)
      }
    });
  }

  getToday(): string {
    return moment().format('D MMMM');
  }
}
