import {inject, Injectable, input} from "@angular/core";
import * as types from '../types/types'

@Injectable({providedIn:'root'})
export class MovieService {
    constructor() {}
    private url = `http://localhost:8080/api/movies`
    private adminUrl = `http://localhost:8080/api/admin/movies`
    
    async getMovies(): Promise<types.Movie[]> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            methods: "GET",
            headers,
        }
        const response = await fetch(this.url, requestOptions);
        return await response.json();
    }
    
    async getAdminMovies(jwt:string): Promise<types.Movie[]> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${jwt}`);
        const requestOptions = {
            methods: "GET",
            headers,
        }
        const response = await fetch(this.adminUrl, requestOptions);
        return await response.json();
    }
    
    async getMovie(id : number):Promise<types.Movie>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            methods: "GET",
            headers,
        }
        const response = await fetch(`${this.url}/${id}`, requestOptions);
        return await response.json().then(data => {
            data.release_date = new Date(data.release_date).toISOString().split('T')[0]
            return data
        });
    }
    
    async createUpdateMovie(movie: types.Movie, jwt:string): Promise<types.Movie>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", `Bearer ${jwt}`);
        const url = `${this.adminUrl}${movie.id ? `/${movie.id}` : ''}`;
        const method = movie.id ? 'PUT' : 'POST';
        const requestBody :any = movie;
        requestBody.release_date = new Date(movie.release_date);
        requestBody.run_time = +movie.run_time;
        
        const requestOptions:RequestInit = {
            method,
            body : JSON.stringify(requestBody),
            headers,
            credentials : "include"
        }
        
        const response = await fetch(url, requestOptions);
        return await response.json();
    }
    
    async deleteMovie(id:number, jwt:string): Promise<null>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", `Bearer ${jwt}`);
        
        const requestOptions:RequestInit = {
            method:"DELETE",
            headers,
            credentials : "include"
        }
        
        const response = await fetch(`${this.adminUrl}/${id}`, requestOptions);
        return await response.json();
    }
        
        
        
}