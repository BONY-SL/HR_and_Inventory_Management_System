import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../model/authservice/auth.service";
import {UserService} from "../../service/services/user.service";

@Component({
  selector: 'app-sidemenubarstore',
  templateUrl: './sidemenubarstore.component.html',
  styleUrl: './sidemenubarstore.component.css'
})
export class SidemenubarstoreComponent {
  constructor(private router: Router,private authService:AuthService,private userService:UserService) {}

  logout() {

    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      this.authService.logout();
      this.userService.clearUser();
      this.router.navigate(['/login']);
    }
  }
}
