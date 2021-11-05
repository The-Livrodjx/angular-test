import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm

  email: string = ''
  password: string = ''

  constructor(
    private authService: AuthService,
    formbuilder: FormBuilder
  ) { 
    this.loginForm = formbuilder.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  logIn() {
    const {email, password} = this.loginForm.controls

    let emailValue = email.value
    let passwordValue = password.value

    this.authService.logIn(emailValue, passwordValue)
  }



}
