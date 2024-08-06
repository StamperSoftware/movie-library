import {Component, EventEmitter, Output} from '@angular/core';
import {InputComponent} from "../ui/input/input.component";

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
      this.handleLoginEvent.emit(this.email)
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
    }
  }

}
