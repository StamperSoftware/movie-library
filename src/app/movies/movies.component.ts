
import {Component, inject, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import * as types from '../../types/types'
import {parseDate} from "../../helpers/formatters";

@Component({
    selector: 'app-movies',
    standalone: true,
    imports: [],
    templateUrl: './movies.component.html',
    styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
    protected readonly parseDate = parseDate;
    movieService = inject(MovieService);
    movies: types.Movie[]=[];
    ngOnInit() {
        this.movieService.getMovies(0).then(movies => this.movies = movies)
    }

}
