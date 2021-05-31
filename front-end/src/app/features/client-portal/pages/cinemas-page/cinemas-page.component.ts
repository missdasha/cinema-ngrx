import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CinemaFacadeService } from 'src/app/core/services/cinema-facade.service';
import { Cinema } from '../../../../core/models/cinema.model';

@Component({
  selector: 'app-cinemas-page',
  templateUrl: './cinemas-page.component.html',
  styleUrls: ['./cinemas-page.component.scss']
})
export class CinemasPageComponent implements OnInit {
  cinemas$: Observable<Cinema[]>;

  constructor(private cinemaFacadeService: CinemaFacadeService, private router: Router) { }

  ngOnInit() {
    this.cinemas$ = this.cinemaFacadeService.selectCinemasWithGivenFields('name,city,address');
  }

  showAfisha(cinema: string) {
    this.router.navigate(['/afisha'], {
      queryParams: {
        cinema
      }
    });
  }
}
