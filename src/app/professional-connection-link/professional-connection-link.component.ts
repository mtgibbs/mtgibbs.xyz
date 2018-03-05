import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-professional-connection-link',
  templateUrl: './professional-connection-link.component.html',
  styleUrls: ['./professional-connection-link.component.scss']
})
export class ProfessionalConnectionLinkComponent implements OnInit {

  @Input() link: IProfessionalConnectionLink;

  constructor() { }

  get text() {
    return this.link.text;
  }

  get uri() {
    return this.link.uri;
  }

  get icon() {
    return this.link.icon;
  }

  ngOnInit() {
  }

}

export interface IProfessionalConnectionLink {
  text: string;
  uri: string;
  icon: string;
}
