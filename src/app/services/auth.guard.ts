import { AuthService } from 'src/app/services/auth.service';
import { Injectable} from "@angular/core";
import {Router, CanActivate} from '@angular/router'

@Injectable( {
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean{
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
