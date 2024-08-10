import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {

  @Input() name = ""
  @Input() title = ""
  @Input() value = ""
  @Input() onChange = ()=>{}
  @Input() errorClass = ""
  @Input() errorMsg = ""
  @Input() placeHolder = ""
  @Input() options:HTMLOptionElement[] = [];
}
