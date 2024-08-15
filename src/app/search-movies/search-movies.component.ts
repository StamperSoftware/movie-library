import {Component, inject, OnInit} from '@angular/core';
import * as types from '../../types/types'
import {GraphService} from "../../services/graph.service";
import {InputComponent} from "../ui/input/input.component";
import {parseDate} from "../../helpers/formatters";
@Component({
    selector: 'app-search-movies',
    standalone: true,
    imports: [
      InputComponent
    ],
    templateUrl: './search-movies.component.html',
    styleUrl: './search-movies.component.css'
})
export class SearchMoviesComponent implements OnInit {
  
    protected readonly parseDate = parseDate;
    movieService = inject(GraphService);
    movies : types.Movie[] = [];
    search : string = "";
    fullList : types.Movie[] = [];
    
    ngOnInit() {
        this.movieService.getMovieList()
            .then(movies => {
                this.movies = movies;
                this.fullList = movies;
            })
    }
    
    handleChange(newSearch:string){
        if (newSearch.length < 3) {
            this.movies = [...this.fullList];
            return;
        }
      
        this.search = newSearch;
        this.movieService.getMovieSearch(this.search)
            .then(movies=>{
                this.movies = movies;
            })
    }
}
