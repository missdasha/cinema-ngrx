import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthorizationService } from '../../../../core/services/authorization.service';
import { PASSWORD_PATTERN } from '../constants';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss', '../form.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userEmail: ['', [
        Validators.required,
        Validators.email
      ]],
      userPassword: ['', [
        Validators.required,
        Validators.pattern(PASSWORD_PATTERN)
      ]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const user: User = {
        email: this.loginForm.controls['userEmail'].value,
        password: this.loginForm.controls['userPassword'].value,
      };
      this.authorizationService.login(user);
    }
  }
}
