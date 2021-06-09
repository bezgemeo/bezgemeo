import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public passwordType: 'password' | 'text' = 'password';
  public error: string = '';
  private destroy = new Subject();
  // @ts-ignore
  public user: firebase.User | null = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.logIn();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private initForm(): void {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
        password: ['', [Validators.required]]
      }
    );
  }

  public togglePasswordInputType(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  public logIn(): void {
    if(this.form.valid) {
      this.authService.login(this.form.value.email, this.form.value.password);
    }
  }
}
