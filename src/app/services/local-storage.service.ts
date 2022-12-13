import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // @ts-ignore
  storage : Storage;
  private static readonly Key = 'collections'
  constructor() {
    this.storage = window.localStorage;
  }

  set(value : string) : void {
    this.storage[LocalStorageService.Key] = value;
  }

  get() : string {
    return this.storage[LocalStorageService.Key];
  }

  getValue<T>(): T  {
    const obj = JSON.parse(this.storage[LocalStorageService.Key] || null);
    return <T>obj;
  }

  remove() : any {
    this.storage.removeItem(this.storage[LocalStorageService.Key]);
  }

  clear() {
    this.storage.clear();
  }

  get length() : number {
    return this.storage.length
  }

  get isStorageEmpty() : boolean {
    return this.storage.length === 0;
  }
}
