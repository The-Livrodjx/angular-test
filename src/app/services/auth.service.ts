import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosError } from 'axios';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

interface LoginData {
  email: string
  password: string
}

interface BodyAddress {
  id: string
  street: string
  city: string
  state: string
  zipCode: string
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

  async updateUser(id: string, email: string, username: string) {

    return axios.put(`http://localhost:3000/user/update`, {
      id,
      email,
      username
    }).then((response) => {
      
      let storage = JSON.parse(window.localStorage.getItem('USER_INFO') || '{}')

      storage.username = response.data.name

      window.localStorage.setItem("USER_INFO", JSON.stringify(storage))      
    }).catch(err => {
      console.log(err)
    })

  }

  async addAddress(body: BodyAddress) {

    console.log(body)
    return axios.post("http://localhost:3000/user/createAddress", {
      body
    }).then(response => {

    }).catch(err => {

      console.log(err)
    })

  }
  
  excludeAddress(userId: string, addressId: string) {

    axios.post("http://localhost:3000/user/excludeAddress", {
      userId,
      addressId
    }).then(response => {

      console.log(response.data)
    })


  }

  addContact(userId: string, contactId: string) {
    axios.post("http://localhost:3000/user/createContact", {
      userId,
      contactId
    }).then(response => {
      console.log(response)
    }).catch(err => {

      console.log(err)
    })
  }

  excludeContact() {

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
