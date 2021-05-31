import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Cinema } from '../../../../core/models/cinema.model';
import { Film } from '../../../../core/models/film.model';
import { Seance } from '../../../../core/models/seance.model';
import { Seat } from '../../models/seat.model';
import { Service } from '../../../../core/models/service.model';
import { AuthorizationService } from '../../../../core/services/authorization.service';
import { CinemaService } from '../../../../core/services/cinema.service';
import { OrderService } from '../../services/order.service';
import { getImageSrc } from 'src/app/shared/utils/utils';
import { seatsNames } from '../../../../core/сonstants/constants';
import { FilmFacadeService } from 'src/app/core/services/film-facade.service';

@Component({
  selector: 'app-seats-selection-page',
  templateUrl: './seats-selection-page.component.html',
  styleUrls: ['./seats-selection-page.component.scss']
})
export class SeatsSelectionPageComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject();
  seatsTypes: { standard: Seat, loveSeats: Seat, vip: Seat } = {
    standard: {
      class: 'seat_standard',
      description: 'Одноместное комфортное кресло с подстаканником.'
    },
    loveSeats: {
      class: 'seat_love',
      description: 'Удобный диван для двоих.'
    },
    vip: {
      class: 'seat_vip',
      description: 'Раскладывающееся кресло с подставкой для ног и выдвижным столиком.'
    }
  };
  seatsNamesObject = seatsNames;
  filmId: string;
  seanceId: string;
  film: Film;
  seance: Seance;
  cinema: Cinema;
  reservedSeats: boolean[][] = [];
  chosenSeats: Array<{ row: number, seat: number, type: string }> = [];
  chosenServices: Service[] = [];
  isModalWindowVisible = false;
  totalCost: number;
  isUserAuthorized: boolean;
  imageSrc: string;

  constructor(
    private cinemaService: CinemaService,
    private orderService: OrderService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute,
    private filmFacadeService: FilmFacadeService
  ) { }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        takeUntil(this.notifier$),
        switchMap((queryParam: { filmId: string, seanceId: string }) => {
          this.filmId = queryParam.filmId;
          this.seanceId = queryParam.seanceId;
          return this.filmFacadeService.selectFilmById(this.filmId).pipe(
            filter((film: Film) => !!film)
          );
        }),
        switchMap((film: Film) => {
          this.film = film;
          this.imageSrc = getImageSrc(film);
          this.seance = this.film.seances.find((seance: Seance) => seance._id === this.seanceId);
          this.seance.occupiedSeats
            .forEach((row: boolean[]) => this.reservedSeats.push(new Array(row.length).fill(false)));
          return this.cinemaService.getCinemaByName(this.seance.cinema.name);
        })
      )
      .subscribe((cinema: Cinema) => {
        this.cinema = cinema;
      });

    this.authorizationService.isUserAuthorized$.pipe(takeUntil(this.notifier$))
      .subscribe(
        value => {
          this.isUserAuthorized = value;
          if (!value) {
            this.chosenSeats.forEach(chosenSeat => {
              this.reservedSeats[chosenSeat.row][chosenSeat.seat] = false;
            });
            this.chosenSeats = [];
            this.totalCost = 0;
          }
        }
      );
  }

  ngOnDestroy() {
    this.notifier$.next();
  }

  getSeatClasses(type: string): string {
    return 'seat ' + this.seatsTypes[type].class;
  }

  selectSeat(row: number, seat: number, type: string) {
    if (!this.seance.occupiedSeats[row][seat]) {
      if (!this.isUserAuthorized) {
        this.authorizationService.setModalWindowVisibility(true);
      }
      else {
        if (this.reservedSeats[row][seat]) {
          this.reservedSeats[row][seat] = false;
          this.deleteSeat(row, seat);
        }
        else {
          this.reservedSeats[row][seat] = true;
          this.chosenSeats.push({ row, seat, type });
          this.calculateTotalCost();
        }
      }
    }
  }

  showModalWindow() {
    if (this.chosenSeats.length) {
      this.isModalWindowVisible = !this.isModalWindowVisible;
    }
  }

  hideModalWindow() {
    this.isModalWindowVisible = !this.isModalWindowVisible;
  }

  deleteSeat(row: number, seat: number) {
    const seatIndex = this.chosenSeats.findIndex(choice => choice.row === row && choice.seat === seat);
    this.chosenSeats.splice(seatIndex, 1);
    this.reservedSeats[row][seat] = false;
    this.calculateTotalCost();
  }

  addService(service: Service) {
    this.chosenServices.push(service);
    this.calculateTotalCost();
  }

  deleteService(serviceToBeDeleted: Service) {
    const serviceIndex = this.chosenServices.findIndex((service: Service) => service._id === serviceToBeDeleted._id);
    this.chosenServices.splice(serviceIndex, 1);
    this.calculateTotalCost();
  }

  calculateTotalCost() {
    this.totalCost = 0;
    this.chosenServices.forEach((service: Service) => this.totalCost += service.price);
    this.chosenSeats.forEach(seat => this.totalCost += this.seance.prices[seat.type]);
  }

  confirmChoice() {
    if (this.chosenSeats.length) {
      const order = {
        userId: localStorage.getItem('id'),
        seance: this.seance,
        services: this.chosenServices,
        seats: this.chosenSeats,
        totalCost: this.totalCost
      };

      this.chosenSeats.forEach(chosenSeat => {
        this.seance.occupiedSeats[chosenSeat.row][chosenSeat.seat] = true;
        this.reservedSeats[chosenSeat.row][chosenSeat.seat] = false;
      });

      this.orderService.postOrder(order);

      this.chosenSeats = [];
      this.chosenServices = [];
      this.hideModalWindow();
    }
  }
}
