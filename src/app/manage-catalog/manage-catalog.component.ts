import {Component, inject, input, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { MovieService } from "../../services/movie.service";
import * as types from "../../types/types"
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthenticateService} from "../../services/authenticate.service";

@Component({
    selector: 'app-manage-catalog',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './manage-catalog.component.html',
    styleUrl: './manage-catalog.component.css'
})

export class ManageCatalogComponent implements OnInit {
    constructor(private router:Router) {
    }
    movieService = inject(MovieService);
    movies: types.Movie[]=[];
    @Input() jwt = ''

    ngOnInit() {
      this.movieService.getAdminMovies(this.jwt).then(movies => this.movies = movies)
    }
}
