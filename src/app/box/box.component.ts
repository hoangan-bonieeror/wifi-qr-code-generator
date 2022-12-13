import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IBox {
  ssid : string,
  imgPath : string
}
@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  // @ts-ignore
  @Input() data : IBox;
  // @ts-ignore
  @Input() hello : string;
  @Output('remove') removeEvent = new EventEmitter<IBox>();
  constructor() { }

  ngOnInit(): void {  
  }

  onRemoveNet() {
    this.removeEvent.emit(this.data);
  }
}
