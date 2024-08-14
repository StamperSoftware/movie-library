import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-select',
    standalone: true,
    imports: [],
    templateUrl: './select.component.html',
    styleUrl: './select.component.css'
})
export class SelectComponent {

    @Input() title = ""
    @Input() value = ""
    @Input() errorMsg = ""
    @Input() placeHolder = ""
    @Input() options: {id:string,value:string }[] = [];
    
    @Output() onChangeEvent = new EventEmitter<string>();
    
    onChange(value:string){
        this.onChangeEvent.emit(value)
    }
}
