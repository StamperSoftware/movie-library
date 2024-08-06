import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent{
  
  @Input() name = ''
  @Input() type = ''
  @Input() placeholder = ''
  @Input() autoComplete = ''
  @Input() value = ''
  @Input() errorMessage = ''
  @Output() onChangeEvent = new EventEmitter<string>();
  
  onChange(value:string){
    this.onChangeEvent.emit(value)
  }
}
