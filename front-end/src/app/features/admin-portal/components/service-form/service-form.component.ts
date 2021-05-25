import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Service } from '../../../../core/models/service.model.js';
import { AdditionalService } from '../../../../core/services/additional.service';
import { messages } from '../../../../core/сonstants/constants';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss', '../../admin-form.scss']
})
export class ServiceFormComponent {
  serviceForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private service: AdditionalService) {
    this.serviceForm = fb.group({
      name: ['', [
        Validators.required,
      ]],
      price: ['', [
        Validators.required,
        Validators.min(0.1)
      ]],
      quantity: ['', [
        Validators.required
      ]]
    }, {
      validator: this.quantityValidator('quantity')
    });
  }

  quantityValidator(controlName: string): ValidationErrors | null {
    return (formGroup: FormGroup) => {
      const quantityControl = formGroup.controls[controlName];
      if (quantityControl.errors && !quantityControl.errors.isPositive) {
        return;
      }
      if (parseFloat(quantityControl.value) <= 0 || !parseFloat(quantityControl.value)) {
        quantityControl.setErrors({ isPositive: true });
      }
      else {
        quantityControl.setErrors(null);
      }
    };
  }

  add() {
    this.serviceForm.markAllAsTouched();
    if (this.serviceForm.valid) {
      const service: Service = {
        name: this.serviceForm.controls['name'].value,
        price: this.serviceForm.controls['price'].value,
        quantity: this.serviceForm.controls['quantity'].value.replace(' ', '')
      };
      this.service.postService(service).subscribe(
        (info: { message: string, data: string }) => {
          alert(messages[info.message]);
          this.serviceForm.reset();
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
