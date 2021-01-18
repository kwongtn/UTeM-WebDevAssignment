import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import {
  Area,
  AreaResponse,
  RegistrationForm,
  RegistrationResponse,
} from 'models/apiTypes';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  password1Dirty: boolean = false;
  password1Touched: boolean = false;
  password2Touched: boolean = false;
  password2Dirty: boolean = false;
  formError: boolean = false;
  form = this.fb.group({
    name: [null, Validators.required],
    notes: '',
    address: [null, Validators.required],
    area: [null, Validators.required],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.required],
    password2: [null, Validators.compose([Validators.required])],
  });

  additionalNotes = false;
  formLoading = true;
  areas!: AreaResponse;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.sessionService.getAreaList().subscribe((res: AreaResponse) => {
      console.log(res);
      // this.areas = res;
      this.areas = res.sort((a: string, b: string) => {
        return a < b ? -1 : 1;
      });
      this.formLoading = false;
    });
  }

  onSubmit() {
    if (this.form.get('password')?.value != this.form.get('password2')?.value) {
      alert('Passwords do not match.');
    }
    if (this.form.valid) {
      this.sessionService
        .register(this.form.getRawValue() as RegistrationForm)
        .subscribe((res: RegistrationResponse) => {
          if (res.status) {
            alert('Thank you for registering, You can now login.');
            this.router.navigate(['/login']);
          } else {
            alert('Registration failed. ' + res.message);
          }
        });
    } else {
      this.formError = true;
    }
  }

  clearEntries() {
    this.form.reset();
  }
}
