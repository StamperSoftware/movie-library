import {Component, inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import * as types from '../../types/types'
import {InputComponent} from "../ui/input/input.component";
import {SelectComponent} from "../ui/select/select.component";
import mpaa_ratings from "../../data/mpaa_ratings.json"
import {TextareaComponent} from "../ui/textarea/textarea.component";
import {GenreService} from "../../services/genre.service";
import {CheckboxComponent} from "../ui/checkbox/checkbox.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-movie',
  standalone: true,
    imports: [
        InputComponent,
        SelectComponent,
        TextareaComponent,
        CheckboxComponent,
    ],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css'
})
export class CreateMovieComponent implements OnInit {
    constructor(private route:ActivatedRoute, private router:Router) {} 

    protected readonly mpaa_ratings = mpaa_ratings;
    error = '';
    errors : string[] = [];
    movieId = 0;
    movieService = inject(MovieService);
    genreService = inject(GenreService);
    movie:types.Movie = {description: "", id: 0, mpaa_rating: "", title: "", release_date: "", run_time: 0, genres:[], image:"", genres_array:[]}
    genres:types.Genre[] = [];
    @Input() jwt = "";
    
    ngOnInit() {
        this.movieId = parseInt(this.route.snapshot.paramMap.get('id') ?? "0")
        
        if (isNaN(this.movieId)) {
            history.pushState({error : {error: {message: "Could not find movie"}}}, '', '/error')
            this.router.navigate(["/error"])
            return
        }
        
        if (this.movieId) {
            Promise.all([this.movieService.getMovie(this.movieId), this.genreService.getGenres()])
                .then(([movie, genres]) => {
                    this.movie = movie;
                    genres.forEach(genre=>{
                        if (!this.movie.genres_array?.find(g => g === genre.id)) {
                            this.movie.genres.push(genre)
                        }
                    })
                })
        } else {
            
            this.genreService.getGenres()
                .then(genres=>{
                    this.movie.genres_array = [];
                    this.movie.genres = genres;
                })
            
        }
    }
    
    handleSubmit(event:SubmitEvent){
        event.preventDefault();
        
        let required = [
            {field : this.movie.title, name:"title"},
            {field : this.movie.release_date, name:"release_date"},
            {field : this.movie.run_time, name:"run_time"},
            {field : this.movie.description, name:"description"},
            {field : this.movie.mpaa_rating, name:"mpaa_rating"},
        ]
        
        required.forEach(item=>{
            if (!item.field) {
                this.errors.push(item.name)
            }
        })
        
        if (!this.movie.genres_array.length) {
            this.errors.push("genre")
            Swal.fire({title:"Error!",text: 'Must choose one genre',icon: 'error',confirmButtonText: 'OK'})
        }
        
        if (this.errors.length) return;
     
        this.movieService.createUpdateMovie(this.movie, this.jwt)
            .then((data:any) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    this.router.navigate(["/admin/manage-catalog"])
                }
            })
    }
    
    handleChange(newValue:string,field:string) {
        this.movie = {...this.movie, [field]: newValue};
    }
    
    handleCheck(e:Event,id:number) {
        let genre = this.movie.genres.find(g => g.id === id);
        
        if (!genre) return;
        
        genre.checked = !genre.checked;
        
        if (!genre.checked) {
            this.movie.genres_array = this.movie.genres_array.filter(id => id !== genre.id)
        } else {
            this.movie.genres_array.push(genre.id);
        }
    }
    
    handleDelete() {
        
        Swal.fire({title:"Delete Movie?",text: 'You cannot undo this action',icon: 'warning',confirmButtonText: 'Delete', showCancelButton: true,
            confirmButtonColor: '#3085d6', cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                this.movieService.deleteMovie(this.movie.id, this.jwt)
                    .then(() => this.router.navigate(["/admin/manage-catalog"]))
            }
        })
    }
    
    hasError(field:string)  {
        return this.errors.indexOf(field) !== -1
    }

}
