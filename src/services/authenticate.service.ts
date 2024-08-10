import {Injectable} from "@angular/core";
import * as types from '../types/types'

@Injectable({providedIn:'root'})
export class AuthenticateService {
    constructor() {}
    private url = `http://localhost:8080/api`;
    
    async authenticateUser(email: string, password: string): Promise<types.JWT> {
        const payload = {email, password};
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(payload),

        }

        const response = await fetch(`${this.url}/authenticate`, requestOptions);
        return await response.json();
    }
    
    async refreshToken(): Promise<types.JWT> {
        
        const requestOptions: RequestInit = {
            method: 'GET',
            credentials: "include",
        }

        const response = await fetch(`${this.url}/refresh`, requestOptions);
        return await response.json();
    }
    
    async logoutUser(): Promise<any> {
        const requestOptions: RequestInit = {
            method: 'GET',
            credentials: "include",
        }
        return await fetch(`${this.url}/logout`, requestOptions)
            .catch(error => console.log(error));
        
    }
    
}