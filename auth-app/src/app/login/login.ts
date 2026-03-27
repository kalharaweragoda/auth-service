import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  role = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any) {
    if (form.invalid) return;
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        switch(this.role){
          case 'admin':
            this.router.navigate(['/dashboard']);
            break;
          case 'student':
            this.router.navigate(['/student-dashboard']);
            break;
          case 'teacher':
            this.router.navigate([['./teacher-dashboard']])
        }
        console.log(this.role);

        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Invalid credentials';
      },
    });
  }
}
