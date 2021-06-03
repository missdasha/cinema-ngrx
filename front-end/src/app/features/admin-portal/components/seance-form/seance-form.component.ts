import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import * as moment from 'moment';
import { Cinema } from '../../../../core/models/cinema.model';
import { Film } from '../../../../core/models/film.model';
import { getTimestamp } from 'src/app/shared/utils/utils';
import { SeanceService } from '../../../../core/services/seance.service';
import { Seance } from '../../../../core/models/seance.model';
import { messages, seatsNames } from '../../../../core/сonstants/constants';
import { filter, takeUntil } from 'rxjs/operators';
import { FilmFacadeService } from 'src/app/core/services/film-facade.service';
import { CinemaFacadeService } from 'src/app/core/services/cinema-facade.service';

@Component({
  selector: 'app-seance-form',
  templateUrl: './seance-form.component.html',
  styleUrls: ['./seance-form.component.scss', '../../admin-form.scss']
})
export class SeanceFormComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject();
  seanceForm: FormGroup = new FormGroup({});
  films: Film[] = [];
  cinemas: Cinema[] = [];
  isLoaded = false;
  formats = ['2D', '3D'];
  todayDate = moment().unix();
  seatsNamesObject = seatsNames;

  constructor(
    private fb: FormBuilder,
    private seanceService: SeanceService,
    private filmFacadeService: FilmFacadeService,
    private cinemaFacadeService: CinemaFacadeService
  ) { }

  ngOnInit() {
    combineLatest([
      this.cinemaFacadeService.selectCinemas(), 
      this.filmFacadeService.selectFilms()
    ])
      .pipe(
        filter(([cinemas, films]) => !!cinemas.length && !!films.length),
        takeUntil(this.notifier$)
      )
      .subscribe(
      ([cinemas, films]: [Cinema[], Film[]]) => {
        this.films = films;
        this.cinemas = cinemas;

        this.seanceForm = this.fb.group({
          film: ['', [
            Validators.required,
          ]],
          cinema: ['', [
            Validators.required,
          ]],
          hallNumber: ['', [
            Validators.required,
          ]],
          date: ['', [
            Validators.required,
          ]],
          time: ['', [
            Validators.required
          ]],
          format: ['2D', [
            Validators.required,
          ]],
          prices: this.fb.array(Array(3).fill(''))
        }, {
            validator: this.timeRangeValidator('time')
          }
        );

        this.isLoaded = true;
      })
  }

  ngOnDestroy() {
    this.notifier$.next();
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.seanceForm.controls;
  }

  timeRangeValidator(controlName: string): ValidationErrors | null  {
    return (formGroup: FormGroup) => {
      const timeControl = formGroup.controls[controlName];
      if (timeControl.errors && !timeControl.errors.timeIsCorrect) {
        return;
      }
      const time = +timeControl.value.split(':')[0];
      if (time < 11 || time > 22) {
        timeControl.setErrors({ timeIsCorrect: true });
      }
      else {
        timeControl.setErrors(null);
      }
    };
  }

  add() {
    this.seanceForm.markAllAsTouched();
    if (this.seanceForm.valid) {
      const hallNumber = this.controls['hallNumber'].value;
      const prices = {};
      this.controls['cinema'].value.halls[hallNumber - 1].seatsTypes.forEach((type: string, i: number) => {
        prices[type] = this.controls['prices'].value[i];
      });
      const occupiedSeats = this.controls['cinema'].value.halls[hallNumber - 1].plan.map(
        (row: boolean[]) => new Array(row.length).fill(false)
      );
      const startTime = getTimestamp(this.controls['date'].value + ' ' + this.controls['time'].value);
      const endTime = +moment(this.controls['date'].value + ' ' + this.controls['time'].value)
                      .add(this.controls['film'].value.duration)
                      .format('X');

      const seance: Seance = {
        film: this.controls['film'].value._id,
        cinema: this.controls['cinema'].value._id,
        format: this.controls['format'].value,
        occupiedSeats,
        hallNumber,
        prices,
        startTime,
        endTime
      };
      this.seanceService.postSeance(seance).subscribe(
        (info: { message: string, data: Seance }) => {
          alert(messages[info.message]);
          for (let controlName in this.controls) {
            if (controlName === 'prices') {
              this.controls[controlName].reset(Array(3).fill(''));
            }
            else if (controlName === 'format') {
              this.controls[controlName].reset('2D');
            }
            else {
              this.controls[controlName].reset('');
            }
          }
        },
        (e) => {
          if (e.error) {
            alert(messages[e.error.message]);
          }
          else {
            alert('Извините, произошла ошибка');
            console.error(e);
          }
        }
      );
    }
  }
}
