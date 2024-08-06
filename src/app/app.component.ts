import {Component, Input} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import {LoginComponent} from "./login/login.component";
import {AlertComponent} from "./components/alert/alert.component";
import * as types from '../types/types';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,SideBarComponent,AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(private router :Router) {}
  
  title = 'movie-library';
  jwt = '';
  alertMessage = '';
  alertType = '';
  
  setAlertMessage(alert:types.Alert){
    this.alertMessage = alert.message;
    this.alertType = alert.type;
  }
  
  handleLogout() {
    this.jwt = '';
    this.router.navigate(['/login'])
  }
  
  handleLogin(jwt:string){
    this.jwt = jwt;
    this.alertMessage = '';
    this.alertType = '';
    this.router.navigate(['/']);
  }
  
  subscribeToEmitter(child:any) {
    if (child instanceof LoginComponent) {
      child.handleLoginEvent.subscribe((jwt)=>this.handleLogin(jwt));
      child.setAlertMessageEvent.subscribe((alert)=>this.setAlertMessage(alert));
      return;
    }
  }
}
