import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userAuthenticated : boolean = false

  constructor(private router: Router, private userService: UserService) { }

  logIn(email: string, password: string) {

    if(email !== "" && password !== "") {}

    else {
      this.userAuthenticated = false
    }
  }


}
