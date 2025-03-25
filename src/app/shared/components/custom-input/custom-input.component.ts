import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: false,

})
export class CustomInputComponent  implements OnInit {
@Input() control!: FormControl;
@Input() type!: string;
@Input() label!: string;
@Input() autocomplete!: string;
@Input() icon?: string;

isPassword!: boolean;
hide: boolean = true;
  constructor() { }

  ngOnInit() {
    this.isPassword = this.type === 'password'; // Guarda si el input es de contraseña


  }

  showOrHidePassword(){
    this.hide = !this.hide; // Invierte el estado de `hide`
    this.type = this.hide ? 'password' : 'text'; 

  }

}
