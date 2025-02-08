import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  userRole: string | null = localStorage.getItem('role');
  loggedUserData = JSON.parse(localStorage.getItem('user') || '{}');
  router = inject(Router);


  onLogoff() {
    localStorage.removeItem('vacationUser');
    this.router.navigateByUrl('login');
  }


}
