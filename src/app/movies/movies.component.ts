
import {Component, inject} from '@angular/core';
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  movieService = inject(MovieService);
  movies = this.movieService.getMovies();
}
