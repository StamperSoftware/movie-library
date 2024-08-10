import {Component, inject, Input, OnInit} from '@angular/core';
import { MovieService } from "../../services/movie.service";
import * as types from "../../types/types"
import {Router} from "@angular/router";

@Component({
    selector: 'app-manage-catalog',
    standalone: true,
    imports: [],
    templateUrl: './manage-catalog.component.html',
    styleUrl: './manage-catalog.component.css'
})

export class ManageCatalogComponent implements OnInit{
    constructor(private router:Router) {
    }
    movieService = inject(MovieService);
    movies: types.Movie[]=[];
    @Input() jwt = "";
    
    
    ngOnInit() {
      if (!this.jwt) {
        this.router.navigate(["/"])
        return;
      }
      
      this.movieService.getAdminMovies(this.jwt).then(movies => this.movies = movies)
    }
}
