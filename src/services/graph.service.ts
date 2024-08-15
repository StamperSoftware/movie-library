import {Injectable} from "@angular/core";
import * as types from '../types/types'

@Injectable({providedIn:'root'})
export class GraphService {
    constructor() {}
    private url = `http://localhost:8080/api/graph`
    
    async getMovieList(): Promise<types.Movie[]> {
        const payload = `
{
  list {
    id
    title
    run_time
    release_date
    mpaa_rating
  }
}`
        
        const headers = new Headers();
        headers.append('Content-Type', 'application/graphql');
        const requestOptions = {
            method: "POST",
            headers,
            body:payload
        }
        const response = await fetch(this.url, requestOptions);
        return await response.json().then((res:any)=> Object.values(res.data.list));
    }
    
    async getMovieSearch(search?:string): Promise<types.Movie[]> {
        const payload = `
{
    search(titleContains: "${search}") {
        id
        title
        run_time
        release_date
        mpaa_rating
    }
}`;
        
        const headers = new Headers();
        headers.append('Content-Type', 'application/graphql');
        const requestOptions = {
            method: "POST",
            headers,
            body:payload
        }
        const response = await fetch(this.url, requestOptions);
        return await response.json().then((res:any)=> Object.values(res.data.search));
    }
    
}

