import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import * as types from "../../types/types";
import {SelectComponent} from "../ui/select/select.component";
import {GenreService} from "../../services/genre.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [
    SelectComponent
  ],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent implements OnInit {
  
    route = inject(ActivatedRoute)
    router = inject(Router)
    movieService = inject(MovieService);
    genreService = inject(GenreService);
  
    movies: types.Movie[]=[];
    genres: { id:string,value:string }[]=[];
        
    ngOnInit() {
        Promise.all([this.movieService.getMovies(0), this.genreService.getGenres()])
            .then(([movies, genres]) => {
                this.movies = movies;
                this.genres = genres.map(genre => {return {id:genre.id.toString(), value:genre.genre}});
            });
    }

    handleGenreChange(genre:string) {
        this.movieService.getMovies(parseInt(genre || "0"))
            .then(movies => this.movies = movies)
    }
}
