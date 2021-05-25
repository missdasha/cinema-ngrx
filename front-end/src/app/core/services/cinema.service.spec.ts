import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Cinema } from '../models/cinema.model';
import { CinemaService } from './cinema.service';
import { environment } from 'src/environments/environment';
import * as cinemas from '../../assets/static/cinemas.json';

describe('Cinema Service', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let cinemaService: CinemaService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
        providers: [ CinemaService ]
      });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    cinemaService = TestBed.inject(CinemaService);
  })

  afterEach(async() => {
    httpTestingController.verify();
  })

  describe('#getCinemas', () => {
    let expectedCinemas: Cinema[];

    beforeEach(async() => {
      cinemaService = TestBed.inject(CinemaService);
      expectedCinemas = (<any>cinemas).default;
    })

    it('should return expected cinemas', () => {
      cinemaService.getCinemas().subscribe(
        actualCinemas => {
          expect(actualCinemas).toEqual(expectedCinemas);
        },
        fail
      );
      const req = httpTestingController.expectOne(`${environment.baseUrl}${cinemaService.pathToCinemas}${cinemaService.selectQuery}name,city,address,-_id`);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedCinemas);
    })
  })
});