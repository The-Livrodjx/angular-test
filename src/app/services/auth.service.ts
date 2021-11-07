import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosError } from 'axios';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

interface LoginData {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false)
  userName: string = ''
  userId: string = ''
  public token: string = ''

  constructor(private router: Router, private userService: UserService) { }

  logIn(email: string, password: string) {

    if(email !== "" && password !== "") {

      axios.request<LoginData, object>({
        method: "post",
        url: "http://localhost:3000/login",
        data: {
          email,
          password
        }
      }).then((response: any) => {

        window.localStorage.setItem("USER_INFO", JSON.stringify(response.data))
        this.userName = response.data.username
        this.userId = response.data.userId
        this.router.navigate(['home'])
        this.authState.next(true)
      }).catch((err: AxiosError) => {

        console.log(err)
      })

    }

    else {

    }
  }

  isAuthenticated() {
    return this.authState.value
  }

  ifIsAuthenticated() {
    let response = window.localStorage.getItem('USER_INFO')

    if(response) {
      this.userName = JSON.parse(response).username
      this.userId = JSON.parse(response).userId
      this.router.navigate(['home']);
      this.authState.next(true)
    }
  }

  logOut() {
    window.localStorage.removeItem('USER_INFO')
    this.router.navigate(['login']);
    this.authState.next(false)
  }

}
