import {Injectable} from "@angular/core";
import * as types from '../types/types'

@Injectable({providedIn:'root'})
export class MovieService {
    constructor() {}
    private url = `http://localhost:8080/api/movies`
    
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
    
    async getMovie(id : number):Promise<types.Movie>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            methods: "GET",
            headers,
        }
        const response = await fetch(this.url, requestOptions);
        return await response.json().then(data => data.find((movie:types.Movie) => movie.id === id));
    }
}