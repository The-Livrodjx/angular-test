import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/users";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-home',
    styleUrls: ["./home.component.css"],
    templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {

    users: User[] = []
    userName: string = ''

    constructor(
        private userService: UserService
    ) {}

    ngOnInit(): void {
        
        this.getAllUsers()
    }


    getAllUsers() {
        this.userService.getUsers().subscribe((users: User[]) => {
            this.users = users;
        })

        return this.users
    }
 
}