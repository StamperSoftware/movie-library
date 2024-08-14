import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {

  @Input() title = ""
  @Input() value = ""
  @Input() checked = false  
  
  @Output() onChangeEvent = new EventEmitter<Event>();
  onChange(e:Event){
    this.onChangeEvent.emit(e)
  }
}
