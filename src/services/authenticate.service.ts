import {Injectable} from "@angular/core";
import * as types from '../types/types'

@Injectable({providedIn:'root'})
export class AuthenticateService {
    constructor() {}
    private url = `http://localhost:8080/api/authenticate`;
    
    async authenticateUser(email:string,password:string):Promise<types.JWT>{
        const payload = {email, password};
        const requestOptions:RequestInit = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          /*credentials: "include",*/
          body: JSON.stringify(payload),
          
        }
        
        return fetch(`http://localhost:8080/api/authenticate`, requestOptions)
            .then(response => response.json())
    }
}