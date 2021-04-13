import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { IWindowService } from './window.service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServerWindowService implements IWindowService {

  // this should be some stripped down Document from DOMINO
  constructor(@Inject(DOCUMENT) private _doc: Document) { }

  isSSR(): boolean {
    return true;
  }

  getReference(): Window | null {
    return this._doc.defaultView;
  }

  // Do not allow setting a timeout for the SSR
  // we'll have the potential to hang the SSR permantly
  setTimeout(callback: Function, timeout: number) {
    return 0;
  }
}
