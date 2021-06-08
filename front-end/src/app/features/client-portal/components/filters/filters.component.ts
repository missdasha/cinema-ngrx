import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Cinema } from '../../../../core/models/cinema.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { defaultControlsValues } from '../../pages/afisha-page/afisha-page.component';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges, OnDestroy {
  @Output() onFilterChanged = new EventEmitter();
  private notifier$ = new Subject();
  private days: string[] = this.getDays();
  private seances: string[] = [defaultControlsValues.seance, '11:00 - 13:59', '14:00 - 16:59', '17:00 - 19:59', '20:00 - 22:59'];
  private _films: string[];
  private _cinemas: Cinema[];
  data: string[][] = [];

  @Input()
  set films(filmsTitles: string[]) {
    if (filmsTitles) {
      this._films = filmsTitles;
      this._films.unshift(defaultControlsValues.film);
      this.data.push(this._films, this.days, this.seances);
    }
  }

  get films(): string[]{
    return this._films;
  }

  @Input()
  set cinemas(cinemas: Cinema[]) {
    if (cinemas) {
      const cinemasNames = [defaultControlsValues.cinema].concat(cinemas.map((cinema: Cinema) => cinema.name));
      const cities = [];
      cinemas.forEach((cinema: Cinema) => {
        if (!cities.includes(cinema.city)) {
          cities.push(cinema.city);
        }
      });
      this.data.unshift([defaultControlsValues.city].concat(cities), cinemasNames);
    }
  }

  get cinemas(): Cinema[] {
    return this._cinemas;
  }

  defaultVariants: string[];
  _formControlsConfig: { [key: string]: string };
  filtersForm: FormGroup;

  @Input()
  set formControlsConfig(formControlsConfig: { [key: string]: string }) {
    if (formControlsConfig) {
      this._formControlsConfig = formControlsConfig;
      this.defaultVariants = Object.keys(formControlsConfig);
    }
  }

  get formControlsConfig(): { [key: string]: string } {
    return this._formControlsConfig;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.filtersForm = this.fb.group(this.formControlsConfig);
    this.filtersForm.valueChanges
      .pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), takeUntil(this.notifier$))
      .subscribe(chosenVariants => {
        this.onFilterChanged.emit(chosenVariants);
      });
  }

  ngOnChanges() {
    if (this.filtersForm) {
      this.filtersForm.get('film').setValue(this.formControlsConfig.film);
      this.filtersForm.get('cinema').setValue(this.formControlsConfig.cinema);
      this.filtersForm.get('city').setValue(this.formControlsConfig.city);
    }
  }

  ngOnDestroy() {
    this.notifier$.next();
  }

  getDays(): string[] {
    const days = [];
    const today = moment();
    let counter = 0;
    while (counter < 7) {
      const day = today.clone().add(counter, 'day');
      days.push(day.format('D MMMM'));
      counter++;
    }
    return days;
  }
}
