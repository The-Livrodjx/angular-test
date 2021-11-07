import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/users";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-home',
  styleUrls: ["./home.component.css"],
  templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {

  users: User[] = []
  user: any = ''
  userName: string = ''
  userId: string = ''
  userAddresses: [any] = [{}]

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  async ngOnInit(){

    this.getUserById(this.authService.userId)
    this.getAllUsers()
    this.userName = this.authService.userName
    this.userId = this.authService.userId
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
      console.log(user.address)
    })

    return this.user && this.userAddresses
  }

  handleLogout() {
    return this.authService.logOut()
  }
}
