import { Component, Input, OnInit } from '@angular/core';
import { IDevIconOptions } from '../dev-icon/dev-icon.component';

@Component({
  selector: 'app-dev-icon-list',
  templateUrl: './dev-icon-list.component.html',
  styleUrls: ['./dev-icon-list.component.scss']
})
export class DevIconListComponent implements OnInit {

  @Input() icons: IDevIconOptions[];

  constructor() { }

  ngOnInit() {
  }

}
