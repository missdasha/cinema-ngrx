import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthorizationService } from '../../../../core/services/authorization.service';
import { PASSWORD_PATTERN } from '../constants';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['../form.scss']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [
        Validators.required,
        Validators.email
      ]],
      userPassword: ['', [
        Validators.required,
        Validators.pattern(PASSWORD_PATTERN)
      ]],
      userPasswordRepeat: ['', [
        Validators.required,
        Validators.pattern(PASSWORD_PATTERN)
      ]]}, {
        validator: this.passwordsMatchValidator('userPassword', 'userPasswordRepeat')
      });
  }

  passwordsMatchValidator(controlName: string, matchingControlName: string): ValidationErrors | null  {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  registerUser() {
    if (this.registrationForm.valid) {
      const user: User = {
        name: this.registrationForm.controls['userName'].value,
        email: this.registrationForm.controls['userEmail'].value,
        password: this.registrationForm.controls['userPassword'].value,
      };
      this.authorizationService.registerUser(user);
    }
  }
}
