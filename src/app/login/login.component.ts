import {Component, EventEmitter, Output} from '@angular/core';
import {InputComponent} from "../ui/input/input.component";
import * as types from '../../types/types'
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
  
  @Output() handleLoginEvent = new EventEmitter<string>();
  handleLogin = () => {
      this.handleLoginEvent.emit('jwt')
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
    if (this.email === "admin@example.com") {
      this.handleLogin()
    } else {
      this.handleError({message : "Invalid Credentials", type : "danger"})
    }
  }

}
