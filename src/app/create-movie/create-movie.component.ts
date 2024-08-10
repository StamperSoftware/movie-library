import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css'
})
export class CreateMovieComponent implements OnInit {
    constructor(private route:ActivatedRoute, private router:Router) {} 
    ngOnInit() {
        if (!this.jwt) {
            this.router.navigate(["/"])
            return;
        }
      
        this.movieId = parseInt(this.route.snapshot.paramMap.get('id') ?? "")
        if (isNaN(this.movieId)) {
            
            history.pushState({error : {error: {message: "Could not find movie"}}}, '', '/error')
            this.router.navigate(["/error"])
            return
        }
        
    }

    @Input() jwt = "";
    error = '';
    errors = [];
    movieId = 0;
}
