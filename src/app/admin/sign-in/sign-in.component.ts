import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthStateModel } from 'src/app/store/auth/auth.model';
import { AuthState } from 'src/app/store/auth/auth.state';
import { AuthService } from '../auth.service';

@Component({
  selector: 'admin-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInModel!: FormGroup;
  @Select(AuthState.getAuth) authState$!: Observable<AuthStateModel>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.authState$.subscribe(
      (authState) =>
        authState.isReady &&
        authState.isAdmin &&
        this.router.navigate(['/admin'])
    );

    this.signInModel = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  async onSubmit() {
    const { email, password } = this.signInModel.value;

    try {
      const user = await this.auth.signIn(email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
}
