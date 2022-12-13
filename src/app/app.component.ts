import { Component, OnInit, OnDestroy } from '@angular/core';
import { Config, generateWifiQRCode } from 'wifi-qr-code-generator';
import { NgForm } from '@angular/forms';
import { IBox } from './box/box.component';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'hello';
  // @ts-ignore
  result : string;
  // @ts-ignore
  inputConfig : Config;
  // @ts-ignore
  encryptOptions = ['WPA', 'WEP', 'None'];
  // @ts-ignore
  networkCollections : IBox[];
  constructor(private _storage : LocalStorageService) {}
  ngOnInit() : void {
    this.result = '';
    this.inputConfig = {
      ssid : '',
      password : '',
      encryption : 'WPA',
      hiddenSSID : false,
      outputFormat : { type : 'image/png' }
    }
    // @ts-ignore
    this.networkCollections = this._storage.get() ? this.fetchLocalStorage() : [];
  }

  ngOnDestroy(): void {
      this._storage.clear();
  }

  async setQRCode(form : NgForm) {
    if(form.valid) {
      for(const [key, value] of Object.entries(form.value)) {
        if(key == 'encryptionIndex') {
          // @ts-ignore
          this.inputConfig['encryption'] = this.encryptOptions[value];
        } else {
          // @ts-ignore
          this.inputConfig[key] = value
        }
      }
      this.result = await generateWifiQRCode(this.inputConfig);
      this.updateCollection({ ssid : this.inputConfig.ssid, imgPath : this.result })
      this.updateLocalStorage();
      form.reset();
    }
  }

  updateCollection(box : IBox) {
    this.networkCollections.push(box);
  }
  updateLocalStorage() {
    this._storage.set(JSON.stringify(this.networkCollections));
  }
  fetchLocalStorage() {
    return this._storage.getValue<IBox[]>();
  }
  removeNetwork(ssid : string) {
    this.networkCollections = this.networkCollections.filter(net => net.ssid !== ssid);
    this.updateLocalStorage();
  }
}
