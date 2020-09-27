import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WaMatConfirmDialog } from '@webacad/material-confirm-dialog';
import { PublicService } from 'src/app/core/services/publicService';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { TreeDTO, TreeViewDTO } from 'src/app/feature-modules/base-information/Dto/UnitDto';
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
  //treeData: Array<TreeDTO>;
  SelectItem: TreeDTO = {
    expanded: undefined,
    UnitId: undefined,
    UnitName: undefined,
    ParentId: undefined,
  }
  apiUrl: string;
  IsChackBox: boolean = false;
  public nodes: any[] = [];
  constructor(
    private _http: PublicShareService,
    @Inject(MAT_DIALOG_DATA) private data,
    private _dialogRef: MatDialogRef<TreeViewComponent>,
  ) {

  }

  private transformer = (node: TreeViewDTO, level: number) => {
    return {
      expanded: node.expanded,
      UnitId: node.UnitId,
      UnitName: node.UnitName,
      ParentId: node.ParentId,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<TreeViewDTO>(
    node => node.level, node => node.expanded);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level,
    node => node.expanded, node => node["children"]);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  hasChild = (_: number, node: TreeViewDTO) => node.expanded;
  //-------------------------------------------------
  ngOnInit(): void {
    if (this.data.IsChackBox != undefined)
      this.IsChackBox = this.data.IsChackBox;


    if (this.data.apiUrl != undefined)
      this.apiUrl = this.data.apiUrl;
    setTimeout(() => this.onPopulateGrid(), 0);


  }

  onCancel() {


    this._dialogRef.close(null);
  }



  onPopulateGrid() {

    this._http.getAll(this.apiUrl).subscribe((res: TreeViewDTO[]) => {
      //  this.treeData = res;
      const cloned = res.map(x => Object.assign([], x));
      this.nodes = this._getPreparedData(cloned);
      this._recursiveEdit(this.nodes, "children", "expandable", false)
      this.dataSource.data = this.nodes;

    })
  }

  onSelectItem(item: any) { this.SelectItem = item }
  onSelect() {

    this._dialogRef.close(this.SelectItem)

  }


  private _getPreparedData(list) {

    let tree = [], lookup = {};
    for (let i = 0, len = list.length; i < len; i++) {
      lookup[list[i]["UnitId"]] = list[i];
      list[i]["children"] = [];

    }
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i]["ParentId"]) {
        lookup[list[i]["ParentId"]]["children"].push(list[i]);
      } else {
        tree.push(list[i]);
      }
    }
    return tree;
  };

  private _recursiveEdit(list, childrenAttr, attr, value) {

    if (Array.isArray(list)) {
      for (let i = 0, len = list.length; i < len; i++) {
        list[i][attr] = value;
        if (list[i][childrenAttr].length) {
          this._recursiveEdit(list[i][childrenAttr], childrenAttr, attr, value);
        }
      }
    }
  }
}
