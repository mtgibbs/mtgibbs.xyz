import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { IWindowService } from './window.service.interface';

@Injectable({
  providedIn: 'root'
})
export class WindowService implements IWindowService {

  constructor(@Inject(DOCUMENT) private _doc: Document) {}

  isSSR(): boolean {
    return false;
  }

  getReference(): Window | null {
    return this._doc.defaultView;
  }
  
  setTimeout(callback: Function, timeout: number) {
    return this.getReference()?.setTimeout(callback, timeout);
  }
}
