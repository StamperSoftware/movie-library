import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css'
})
export class TextareaComponent {

  @Input() name = ""
  @Input() title = ""
  @Input() value = ""
  @Input() rows = ""
  @Input() onChange = ()=>{}
  @Input() errorClass = ""
  @Input() errorMsg = ""
}
