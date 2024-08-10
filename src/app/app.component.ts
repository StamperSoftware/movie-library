import {Component, OnInit,inject} from '@angular/core';
import {NavigationStart, Router, RouterOutlet} from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import {LoginComponent} from "./login/login.component";
import {AlertComponent} from "./components/alert/alert.component";
import * as types from '../types/types';
import {AuthenticateService} from "../services/authenticate.service";
import {ManageCatalogComponent} from "./manage-catalog/manage-catalog.component";
import {CreateMovieComponent} from "./create-movie/create-movie.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,SideBarComponent,AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  authService = inject(AuthenticateService)
  constructor(private router :Router) {}
  
  title = 'movie-library';
  jwt = '';
  alertMessage = '';
  alertType = '';
  tickInterval = setInterval(() => {});
  
  
  ngOnInit() {
    
    this.authService.refreshToken()
        .then(data=>{
          if (data.access_token) {
            this.jwt = data.access_token;
            this.toggleRefresh(true)
          }
        }).catch(err=>{console.log("user is not logged in", err)})
    
    this.router.events.subscribe((event)=>{
      if (event instanceof NavigationStart && !!this.alertMessage) {
        this.setAlertMessage({message:"", type:""})
      }
    })
  }

  setAlertMessage(alert:types.Alert){
    this.alertMessage = alert.message;
    this.alertType = alert.type;
  }
  
  handleLogout() {
    this.authService.logoutUser().finally(()=>{
      this.jwt = '';
      this.toggleRefresh(false)
      this.router.navigate(['/login'])
    })
  }
  
  handleLogin(jwt:string){
    this.jwt = jwt;
    this.alertMessage = '';
    this.alertType = '';
    this.toggleRefresh(true)
    this.router.navigate(['/']);
  }
  
  subscribeToEmitter(child:any) {
    if (child instanceof LoginComponent) {
      child.handleLoginEvent.subscribe((jwt)=>this.handleLogin(jwt));
      child.setAlertMessageEvent.subscribe((alert)=>this.setAlertMessage(alert));
      return;
    }
    if (child instanceof ManageCatalogComponent) {
      child.jwt = this.jwt;
    }
    if (child instanceof CreateMovieComponent) {
      child.jwt = this.jwt;
    }
  }
  
  toggleRefresh(status:boolean){
    if (status) {
      this.tickInterval = setInterval(()=>{
        this.authService.refreshToken()
          .then(data=>{
            if (data.access_token) {
              this.jwt = data.access_token;
              this.toggleRefresh(true)
            }
          }).catch(err=>{console.log("user is not logged in", err)})
      }, 600000);
    } else {
      clearInterval(this.tickInterval);
      this.tickInterval = setInterval(()=>{})
    }
  }
}
