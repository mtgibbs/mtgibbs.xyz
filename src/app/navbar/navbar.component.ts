import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isCollapsed: boolean = true;
  public currentTarget: string = '#about';

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

  public onClick(e) {
    this.currentTarget = e.srcElement.attributes['href'].value;
    this.isCollapsed = true;
  }
}
