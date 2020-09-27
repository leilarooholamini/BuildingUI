import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { GridColumn } from 'src/app/base-class/grid-classes';
import { MatMenuTrigger } from '@angular/material/menu';
 
@Component({
  selector: 'grid-filter',
  templateUrl: './grid-filter.component.html',

})
export class GridFilterComponent implements OnInit {

  constructor() { }
  @Input() column :GridColumn;
  @Output() onSort = new EventEmitter<string>();
  @Output() onFilter = new EventEmitter<any>();
  filtertext:string;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  ngOnInit() {
  }

  openContextMenu(event) {
    event.preventDefault(); // Suppress the browser's context menu
    this.contextMenu.openMenu(); // Open your custom context menu instead
  }


  onGridSort(sortColumn:string){  
        this.onSort.emit(sortColumn);
  }

  onGridFilter(filterColumn:string,operator: any){  
    this.onFilter.emit({filterColumn:filterColumn,input:this.filtertext,Operator: operator});
}

onGridFilterClear(filterColumn:string){
  this.filtertext="";
  this.onFilter.emit({filterColumn:filterColumn,FilterText:this.filtertext ,Operator: null});

}

}
