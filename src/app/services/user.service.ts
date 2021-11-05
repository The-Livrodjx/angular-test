import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { User } from "../models/users";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    public token: string = ''

    baseUrl = "http://localhost:3000/"

    constructor(private httpClient: HttpClient) {}
    
    httpOptions = {
        headers: new HttpHeaders({'Authorization': `Bearer ${this.token}`, 
        'Content-type': 'application/json'})
    }
    

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.baseUrl)
            .pipe()
    }

    handleError(error: HttpErrorResponse) {

        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
    
          errorMessage = error.error.message;
        } else {
          errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      };

}