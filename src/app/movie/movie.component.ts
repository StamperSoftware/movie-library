import {Component, inject, Input, OnInit} from '@angular/core';
import { MovieService } from "../../services/movie.service";
import * as types from "../../types/types"
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit{
  constructor(private route:ActivatedRoute, router:Router) {}
  
  movieService = inject(MovieService);
  movie:types.Movie = {description: "", id: 0, mpaa_rating: "", title: "", release_date: "", run_time: 0, genres:[], image : '', genres_array:[]}
  
  async ngOnInit(){
    const id = parseInt(this.route.snapshot.paramMap.get('id') ?? "")
    await this.movieService.getMovie(id).then(movie => {
      if (!movie) {
        history.pushState({error : {error: {message: "Could not find movie"}}}, '', '/error')
        location.replace("/error")
      } else {
        this.movie = movie;
      }
    })
  }
}
