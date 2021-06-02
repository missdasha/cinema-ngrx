import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FilmFacadeService } from 'src/app/core/services/film-facade.service';
import { Film } from '../../../../core/models/film.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  films$: Observable<Film[]>;
  newestFilms$: Observable<Film[]>;

  constructor(private router: Router, private filmFacadeService: FilmFacadeService) { }

  ngOnInit() {
    this.films$ = this.filmFacadeService.selectFilmsWithGivenFieldsAndSeances('_id,title,genres,age,imageSrc');
    this.newestFilms$ = this.filmFacadeService.selectNewestFilms();
  }

  showMore(film: Film) {
    this.router.navigate(['/afisha'], {
      queryParams: {
        film: film.title
      }
    });
  }
}
