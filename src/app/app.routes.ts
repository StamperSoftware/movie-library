import {Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {MoviesComponent} from "./movies/movies.component";
import {GenresComponent} from "./genres/genres.component";
import {SearchMoviesComponent} from "./search-movies/search-movies.component";
import {CreateMovieComponent} from "./create-movie/create-movie.component";
import {ManageCatalogComponent} from "./manage-catalog/manage-catalog.component";
import {MovieComponent} from "./movie/movie.component";


export const routes: Routes = [
    { path:"", component:HomeComponent },
    { path:"home", component:HomeComponent },
    { path:"login", component:LoginComponent },
    { path:"error", component:ErrorPageComponent },
    { path:"movies", component:MoviesComponent },
    { path:"movies/:id", component:MovieComponent },
    { path:"genres", component:GenresComponent },
    { path:"admin/search-movies", component:SearchMoviesComponent },
    { path:"admin/manage-catalog", component:ManageCatalogComponent},
    { path:"admin/movies/:id", component:CreateMovieComponent },
    { path:"admin/create-movie", component:CreateMovieComponent },
    { path:"**", component:PageNotFoundComponent },
];
