import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent{
  
  @Input() title = ''
  @Input() type = ''
  @Input() placeholder = ''
  @Input() autoComplete = ''
  @Input() value = ''
  @Input() errorMsg = ''
  @Output() onChangeEvent = new EventEmitter<string>();
  
  onChange(value:string){
    this.onChangeEvent.emit(value)
  }
}
