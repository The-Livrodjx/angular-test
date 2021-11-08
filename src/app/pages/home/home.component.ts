import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { User } from "src/app/models/users";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-home',
  styleUrls: ["./home.component.css"],
  templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {

  public updateForm
  public addressForm
  public contactForm

  users: User[] = []
  user: any = ''
  userName: string = ''
  userId: string = ''
  userAddresses: [any] = [{}]
  
  email: string = this.user.email
  formUserName: string = this.user.name

  street: string = ''
  city: string = ''
  state: string = ''
  zipCode: string = ''

  type: string = ''
  contact: string = ''

  constructor(
    private userService: UserService,
    private authService: AuthService,
    formBuilder: FormBuilder
  ) { 

    this.updateForm = formBuilder.group({
      email: [''],
      formUserName: ['']
    })

    this.addressForm = formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zipCode: ['']
    })

    this.contactForm = formBuilder.group({
      type: [''],
      contact: ['']
    })
  }

  async ngOnInit(){

    this.getUserById(this.authService.userId)
    this.getAllUsers()
    this.userName = this.authService.userName
    this.userId = this.authService.userId
    this.formUserName = this.userName
  }


  getAllUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {

      this.users = users;
    })

    return this.users
  }

  getUserById(id: string) {
    this.userService.getUserById(id).subscribe((user: any) => {

      this.user = user
      this.userAddresses = user.address
      this.email = this.user.email
      console.log(user.address)
    })

    return this.user && this.userAddresses
  }

  handleLogout() {
    return this.authService.logOut()
  }

  async updateUser() {
    const {email, formUserName} = this.updateForm.controls

    await this.authService.updateUser(this.userId, email.value, formUserName.value)
    window.location.reload()
  }

  async addAddress() {

    const {street, city, state, zipCode} = this.addressForm.controls

    if(street.value !== "" && city.value !== ""
    && state.value !== "" && zipCode.value !== "") {
      let body = {
        id: `${this.userId}`,
        street: street.value,
        city: city.value,
        state: state.value,
        zipCode: zipCode.value
      }

    
      this.authService.addAddress(body)
      window.location.reload()
    }
    else {
      window.alert("Preencha os campos corretamente")
    }

  }

  excludeAddress(id: string) {
    
    this.authService.excludeAddress(this.userId, id)

    window.location.reload()
  }

  async createContact() {

    const {type, contact} = this.contactForm.controls

    
    this.authService.addContact(type.value, contact.value)
  }
}
