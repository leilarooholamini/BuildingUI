import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'header-dialog',
  templateUrl: './header-dialog.component.html',
  styleUrls: ['./header-dialog.component.css']
})
export class HeaderDialogComponent implements OnInit {

  constructor() { }
  @Input("title") title :string;
  @Output("close") close =new EventEmitter<any>()
  titleName:string;
  ngOnInit() {
    this.titleName=this.title;
  }
  onClose(){
this.close.emit()

  }
}
