import {Injectable} from "@angular/core";
import {movies} from '../data/movies.json'
import * as types from '../types/types'

@Injectable({providedIn:'root'})
export class MovieService {
    constructor() {
        
    }
    movies:types.Movie[] = movies;
    
    getMovies():types.Movie[]{
        return this.movies
    }
    
    getMovie(id : number):types.Movie|undefined{
        return this.movies.find(movie => movie.id === id);
    }
}