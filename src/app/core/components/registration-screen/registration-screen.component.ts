import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-registration-screen',
  templateUrl: './registration-screen.component.html',
  styleUrls: ['./registration-screen.component.scss']
})
export class RegistrationScreenComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public passwordType: 'password' | 'text' = 'password';
  public passwordMatch: boolean = true;
  public error: string = '';
  private destroy = new Subject();

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private initForm(): void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(100)]],
        age: ['', [Validators.required, Validators.maxLength(3)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }
    );
  }

  public togglePasswordInputType(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  public checkPasswordsMatch(): void {
    this.passwordMatch = this.form.value.password === this.form.value.confirmPassword;
  }

  public register(): void {
    if (this.form.valid) {
      this.authService.register(this.form.value.email, this.form.value.password);
      this.authService.createDbItem(
        this.form.value.email,
        this.form.value.password,
        this.form.value.age,
        this.form.value.name
      );
    }
  }

}
