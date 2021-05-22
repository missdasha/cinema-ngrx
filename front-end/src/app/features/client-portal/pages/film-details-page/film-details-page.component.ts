import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Cinema } from '../../models/cinema.model';
import { Film } from '../../models/film.model';
import { Seance } from '../../models/seance.model';
import { CinemaService } from '../../services/cinema.service';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-film-details-page',
  templateUrl: './film-details-page.component.html',
  styleUrls: ['./film-details-page.component.scss']
})
export class FilmDetailsPageComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject();
  filmId: string;
  seancesIds: string[] = [];
  film: Film;
  cinemas: Cinema[];

  constructor(
    private filmService: FilmService,
    private cinemaService: CinemaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        takeUntil(this.notifier$),
        switchMap((queryParam: { filmId: string, seancesIds: string | string[] }) => {
          this.filmId = queryParam.filmId;
          if (typeof queryParam.seancesIds === 'string') {
            this.seancesIds.push(queryParam.seancesIds);
          }
          else {
            this.seancesIds = queryParam.seancesIds;
          }
          return this.filmService.getFilmById(this.filmId);
        }),
        switchMap((film: Film) => {
          this.film = film;
          return this.cinemaService.getCinemas();
        })
      )
      .subscribe((cinemas: Cinema[]) => {
          this.cinemas = cinemas.filter((cinema: Cinema) => {
            return this.film.seances.some(
              (seance: Seance) => this.seancesIds.includes(seance._id) && seance.cinema.name === cinema.name
            );
        });
      });
  }

  chooseSeance(filmId: string, seanceId: string) {
    this.router.navigate(['/afisha/seats'], {
      queryParams: {
        filmId,
        seanceId
      }
    });
  }

  ngOnDestroy() {
    this.notifier$.next();
  }
}
