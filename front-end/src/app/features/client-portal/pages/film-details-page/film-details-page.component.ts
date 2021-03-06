import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { CinemaFacadeService } from 'src/app/core/services/cinema-facade.service';
import { FilmFacadeService } from 'src/app/core/services/film-facade.service';
import { getImageSrc } from 'src/app/shared/utils/utils';
import { Cinema } from '../../../../core/models/cinema.model';
import { Film } from '../../../../core/models/film.model';
import { Seance } from '../../../../core/models/seance.model';

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
  imageSrc: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmFacadeService: FilmFacadeService,
    private cinemaFacadeService: CinemaFacadeService
  ) { }

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
            this.seancesIds = [...queryParam.seancesIds];
          }
          return this.filmFacadeService.selectFilmById(this.filmId);
        }),
        filter((film: Film) => !!film),
        switchMap((film: Film) => {
          this.film = film;
          this.imageSrc = getImageSrc(this.film);
          return this.cinemaFacadeService.selectCinemas();
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
