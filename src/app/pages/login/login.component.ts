import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {IAPIResponseModel} from '../../model/master';
import {MasterService} from '../../service/master.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  http = inject(HttpClient);
  router = inject(Router);
  masterSrv = inject(MasterService);
  username = signal<string>('')
  signUpTrigger = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signUpForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      userName: ['', Validators.required]
    });

    // const storedUser = localStorage.getItem("user");
    // if (storedUser) {
    //   this.router.navigateByUrl('dashboard');
    // }
  }

  onSaveUser() {
    if (this.signUpForm.invalid) {
      alert("Please fill all required fields correctly.");
      return;
    }
    const userObj = this.signUpForm.value;

    this.masterSrv.createNewUser(userObj).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert("Sign Up successfully");
        this.signUpTrigger = false;
      } else {
        alert(res.message);
      }
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      alert("Please fill all fields.");
      return;
    }
    const loginData = this.loginForm.value;
    this.username = loginData.userName;
    if (loginData.userName === 'admin' && loginData.password === '112233') {
      localStorage.setItem("role", "admin");
      this.router.navigateByUrl('dashboard');
      return;
    } else {
      localStorage.setItem("role", "user");
    }

    this.http.post("https://projectapi.gerasim.in/api/FreelancerJobs/login", loginData)
      .subscribe({
        next: (res: any) => {
          if (res.result) {
            localStorage.setItem("user", JSON.stringify(res.data));
            this.router.navigateByUrl('dashboard');
          } else {
            alert(res.message || 'Login failed. Please try again.');
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('An error occurred during login. Please try again later.');
        }
      });
  }
}
