import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FilmFacadeService } from 'src/app/core/services/film-facade.service';
import { Film } from '../../../../core/models/film.model';
import { messages, serverErrorCode } from '../../../../core/сonstants/constants';
import { getTimestamp } from '../../../../shared/utils/utils';
@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.scss', '../../admin-form.scss']
})
export class FilmFormComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject();
  private _ages = [0, 6, 12, 16, 18];
  public get ages() {
    return this._ages;
  }
  public set ages(value) {
    this._ages = value;
  }
  genres = ['комедия', 'драма', 'мелодрама', 'боевик', 'триллер', 'мультфильм', 'ужасы', 'приключения', 'фэнтези'];
  filmForm: FormGroup = new FormGroup({});
  todayDate = moment().unix();
  minDate = this.todayDate;
  maxDate = moment().add(3, 'M').unix();
  image: File;

  constructor(
    private fb: FormBuilder, 
    private filmFacadeService: FilmFacadeService
  ) { }

  ngOnInit() {
    this.filmForm = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required,
      ]],
      age: [0, [Validators.required]],
      duration: ['', [
        Validators.required
      ]],
      startDate: ['', [
        Validators.required
      ]],
      endDate: ['', [
        Validators.required
      ]],
      imageSrc: ['', [
        Validators.required
      ]],
      genres: this.fb.array(Array(this.genres.length).fill(false))
    }, {
      validator: this.atLeastOneCheckboxCheckedValidator('genres')
    });

    this.filmFacadeService.selectSuccessMessage()
      .pipe(
        filter(message => !!message),
        takeUntil(this.notifier$)
      )
      .subscribe(
        (message: string) => {
          alert(messages[message]);
          this.filmForm.reset();
          this.controls.age.setValue(0);
          this.minDate = this.todayDate;
          this.maxDate = moment().add(3, 'M').unix();
        }
      );
    
    this.filmFacadeService.selectError()
      .pipe(
        filter(error => !!error),
        takeUntil(this.notifier$)
      )
      .subscribe(
        (e) => {
          if (e.error && e.status !== serverErrorCode) {
            alert(messages[e.error.message]);
          }
          else {
            alert('Извините, произошла ошибка');
            console.error(e);
          }
        }
      );
  }

  ngOnDestroy() {
    this.notifier$.next();
    this.filmFacadeService.reset();
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.filmForm.controls;
  }

  atLeastOneCheckboxCheckedValidator(checkboxName: string): ValidationErrors | null  {
    return (formGroup: FormGroup) => {
      const checkboxControl = <FormArray>formGroup.controls[checkboxName];
      if (!checkboxControl.value.some((value: boolean) => value)) {
        checkboxControl.setErrors({ atLeastOneCheckboxChecked: true });
      }
      else {
        checkboxControl.setErrors(null);
      }
    };
  }

  getDuration(): { hours: number, minutes: number } {
    const [ hours, minutes ] = this.controls.duration.value.split(':');
    return { hours: +hours, minutes: +minutes };
  }

  chooseStartDate() {
    this.minDate = getTimestamp(this.controls['startDate'].value);
  }

  chooseEndDate() {
    this.maxDate = getTimestamp(this.controls['endDate'].value);
  }

  selectImage(event: Event) {
    this.image = (event.target as HTMLInputElement).files[0];
  }

  add() {
    this.filmForm.markAllAsTouched();
    if (this.filmForm.valid) {
      const genresControlValues = (<FormArray>this.controls['genres']).value;

      const film = {
        ...this.filmForm.value,
        startDate: getTimestamp(this.controls['startDate'].value),
        endDate: getTimestamp(this.controls['endDate'].value),
        duration: this.getDuration(),
        genres: this.genres.filter((genre: string, i: number) => genresControlValues[i]),
        imageSrc: this.image.name
      };

      const form = new FormData();
      Object.entries(film).forEach(([key, value]) => {
        if (typeof value === 'object') {
          form.append(key, JSON.stringify(value));
        }
        else {
          form.append(key, value.toString());
        }
      })
      form.append('file', this.image, this.image.name);

      this.filmFacadeService.addFilm(form);
    }
  }
}
