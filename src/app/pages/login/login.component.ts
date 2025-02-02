import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  router = inject(Router);

  onLogin(): void {
    const formValue = this.userForm.value;
    if (formValue.username == 'admin' && formValue.password == '112233') {
      this.router.navigateByUrl('dashboard').then();
    } else{
      alert('Wrong username or password');
    }
  }
}
