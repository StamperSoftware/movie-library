import {Component, EventEmitter, Output, inject} from '@angular/core';
import {InputComponent} from "../ui/input/input.component";
import * as types from '../../types/types'
import {AuthenticateService} from "../../services/authenticate.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = "";
  password = "";
  authenticateService = inject(AuthenticateService);
  
  @Output() handleLoginEvent = new EventEmitter<string>();
  handleLogin = (token:string) => {
      this.handleLoginEvent.emit(token)
  }
  
  @Output() setAlertMessageEvent = new EventEmitter<types.Alert>();
  handleError = (alert:types.Alert) => {
      this.setAlertMessageEvent.emit(alert)
  }
  
  emailChange = (email:string) => {
    this.email = email;
  }
  
  passwordChange = (password:string) => {
    this.password = password;
  }
  
  handleSubmit = (e:MouseEvent) => { 
    e.preventDefault();
    
    this.authenticateService.authenticateUser(this.email, this.password)
        .then(data => {
          if (data.error) {
            this.handleError({message : "Invalid Credentials", type : "danger"})
            return
          } 
          
          this.handleLogin(data.access_token);
        }).catch(err=>{
          this.handleError({message : err, type : "danger"})
        })
    
  }

}
