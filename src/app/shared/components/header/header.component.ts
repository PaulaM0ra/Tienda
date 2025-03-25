import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,

})
export class HeaderComponent  implements OnInit {
@Input() title! : string;
  
  constructor() { }

  ngOnInit() {}

}
