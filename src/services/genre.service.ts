import {inject, Injectable, input} from "@angular/core";
import * as types from '../types/types'

@Injectable({providedIn:'root'})
export class GenreService {
    constructor() {}
    private url = `http://localhost:8080/api/genres`
    
    async getGenres(): Promise<types.Genre[]> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            methods: "GET",
            headers,
        }
        const response = await fetch(this.url, requestOptions);
        return await response.json();
    }
    
    async getGenre(id : number):Promise<types.Genre>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            methods: "GET",
            headers,
        }
        const response = await fetch(`${this.url}/${id}`, requestOptions);
        return await response.json();
    }
}