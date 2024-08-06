import {Component, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import {LoginComponent} from "./login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie-library';
  jwt = '';
  
  
  handleLogout() {
    this.jwt = '';
  }
  
  subscribeToEmitter(child:any) {
    if (child instanceof LoginComponent) {
      child.handleLoginEvent.subscribe((text)=>{this.jwt = text;});
      return;
    }
  }
}
