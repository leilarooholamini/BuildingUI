import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TreeViewComponent } from '../tree-view/tree-view.component';
import { PublicService } from 'src/app/core/services/publicService';
import { TreeDTO } from 'src/app/feature-modules/base-information/Dto/UnitDto';

@Component({
  selector: 'select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css']
})
export class SelectItemComponent implements OnInit, OnChanges {

  constructor(
    private dialog: MatDialog,
    private _publicService: PublicService,

  ) { }
  @Input("feildTitle") feildTitle: string;
  @Input("title") title: string;
  @Input("apiUrl") apiUrl: string;
  @Input('disabled') disabled: false;

  @Output("OnClick") onClick = new EventEmitter<any>();

  headerName: string
  Titel: string
  ngOnInit() {
    this.headerName = this.feildTitle;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.title) {
      this.Titel = changes.title.currentValue;
    }
  }
  // OnClick() {
  //   if (this.disabled)
  //     return;
  //   this.onClick.emit();
  // }

  OnRemove(){
    let SelectItemNew: TreeDTO = {
      expanded: undefined,
      UnitId: undefined,
      UnitName: undefined,
      ParentId: undefined,
    }

    this.onClick.emit(SelectItemNew);
  }


  OnClick() {
    // if (this.disabled)
    //  return;
    const dialogRef = this.dialog.open(TreeViewComponent,
      {
        disableClose: true,
        autoFocus: true,
        height:"600px", 
        width:"400px",
        data: {
          apiUrl: this.apiUrl
        }
      });

    dialogRef.afterClosed().subscribe(
      (res: TreeDTO) => {
        if (res) {
          this.onClick.emit(res);
        } else
          this.onClick.emit(null);
      });


  }

}
