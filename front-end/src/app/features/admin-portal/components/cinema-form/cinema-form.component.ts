import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Cinema } from '../../../../core/models/cinema.model';
import { Service } from '../../../../core/models/service.model';
import { ProductService } from '../../../../core/services/product.service';
import { messages, serverErrorCode } from '../../../../core/сonstants/constants';
import { CinemaFacadeService } from 'src/app/core/services/cinema-facade.service';

@Component({
  selector: 'app-cinema-form',
  templateUrl: './cinema-form.component.html',
  styleUrls: ['./cinema-form.component.scss', '../../admin-form.scss']
})
export class CinemaFormComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject();
  services: Service[] = [];
  cinemaForm: FormGroup = new FormGroup({});
  isLoaded = false;
  seatsTypesGroup = {};
  seatGroupConfig = { rows: [ '', [ Validators.min(0) ] ], seats: [ '', [ Validators.min(0) ] ] };

  constructor(
    private fb: FormBuilder,
    private cinemaFacadeService: CinemaFacadeService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getServices()
    .pipe(takeUntil(this.notifier$))
    .subscribe(
      (services: Service[]) => {
        this.services = services;

        this.cinemaForm = this.fb.group({
          name: ['', [
            Validators.required,
          ]],
          city: ['', [
            Validators.required,
          ]],
          address: ['', [
            Validators.required,
          ]],
          additionalServices: this.fb.array(Array(this.services.length).fill(false)),
          halls: this.fb.array(Array(1).fill(this.fb.group({
            standard: this.fb.group(this.seatGroupConfig),
            vip: this.fb.group(this.seatGroupConfig),
            loveSeats: this.fb.group(this.seatGroupConfig)
          })))
        }, {
          validator: this.atLeastOneCheckboxCheckedValidator('additionalServices')
        });
        this.isLoaded = true;
      }
    );

    this.cinemaFacadeService.selectSuccessMessage()
      .pipe(
        filter(message => !!message),
        takeUntil(this.notifier$)
      )
      .subscribe(
        (message: string) => {
          alert(messages[message]);
          this.cinemaForm.reset();
        }
      );
    
    this.cinemaFacadeService.selectError()
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
    this.cinemaFacadeService.reset();
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.cinemaForm.controls;
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

  addHall() {
    (<FormArray>this.controls['halls']).push(this.fb.group({
      standard: this.fb.group(this.seatGroupConfig),
      vip: this.fb.group(this.seatGroupConfig),
      loveSeats: this.fb.group(this.seatGroupConfig)
    }));
  }

  add() {
    this.cinemaForm.markAllAsTouched();
    if (this.cinemaForm.valid) {
      const servicesControlValues = (<FormArray>this.cinemaForm.controls['additionalServices']).value;

      const halls = [];
      (<FormArray>this.cinemaForm.controls['halls']).value.forEach((hallFromForm) => {
        const hall: { seatsTypes: string[], plan: string[][] } = { seatsTypes: [], plan: [] };
        Object.entries(hallFromForm).forEach(([type, obj] : [type: string, obj: { rows: number, seats: number }]) => {
          if (obj.rows && obj.seats) {
            hall.seatsTypes.push(type);
            hall.plan = hall.plan.concat(Array(obj.rows).fill(Array(obj.seats).fill(type)));
          }
        });
        halls.push(hall);
      });

      const cinema: Cinema = {
        ...this.cinemaForm.value,
        additionalServices: this.services.filter((service: Service, i: number) => servicesControlValues[i]),
        halls
      };

      this.cinemaFacadeService.addCinema(cinema);
    }
  }
}
