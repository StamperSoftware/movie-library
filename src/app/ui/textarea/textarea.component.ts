import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css'
})
export class TextareaComponent {

  @Input() title = ""
  @Input() value = ""
  @Input() rows = ""
  @Input() errorMsg = ""
  
  @Output() onChangeEvent = new EventEmitter<string>();
  
  onChange(value:string){
    this.onChangeEvent.emit(value)
  }
}
