import { Component, OnInit, OnDestroy, Input, SimpleChanges, OnChanges, Inject, ViewChild, ViewChildren, ElementRef, AfterViewInit, } from '@angular/core';
import { PublicShareService } from '../../service/public-share-service';

import { RecercveFormCommentDto, CreateCommentDto } from '../../Dto/form-omment-dto';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PublicService } from 'src/app/core/services/publicService';


@Component({
  selector: 'mn-comment',
  templateUrl: './mncomment.component.html',
  styleUrls: ['./mncomment.component.scss']
})
export class MNCommentComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input("ExternalId") ExternalId: string
  @Input("FormType") FormType: string
  errors: string[] = [];

  saveSubscription: Subscription;
  getRecordSubscription: Subscription;

  entity: CreateCommentDto = { ExternalId: null, ParentId: null, Text: "", Title: "", FormType:null };
  commentlst: RecercveFormCommentDto[] = [];
  constructor(private _http: PublicShareService,
    private _publicService: PublicService) {
  }

  OnInsertAddToComment(item: RecercveFormCommentDto, newComment: HTMLElement) {
    newComment.scrollIntoView();
    this.entity.ParentId=item.CommentId;

  }

  ngAfterViewInit(): void {
    setTimeout(() => {

      this.onRefresh()
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
 
    if (changes.ExternalId.currentValue != undefined && changes.ExternalId.currentValue != "" && changes.ExternalId.currentValue != null) {
    
      this.entity   = { ExternalId: this.ExternalId, ParentId: null, Text: "", Title: "", FormType: this.FormType };

      this.onRefresh();
    }
  }
  ngOnInit() {
    this.entity   = { ExternalId: this.ExternalId, ParentId: null, Text: "", Title: "", FormType: this.FormType };

      }

  onRefresh() {

    if (this.ExternalId)
      this._http.getAll("CommentPanel/GetAllCommentWithExternalId?externalId=" + this.ExternalId + "&FormType=" + this.FormType).subscribe((res: any[]) => {
        const cloned = res.map(x => Object.assign([], x));
        this.commentlst = this._getPreparedData(cloned);

      });
  }

  OnNewComment(newComment: HTMLElement) {
    newComment.scrollIntoView();
    this.entity   = { ExternalId: this.ExternalId, ParentId: null, Text: "", Title: "", FormType: this.FormType };
  }

  private _getPreparedData(list) {

    let tree = [], lookup = {};
    for (let i = 0, len = list.length; i < len; i++) {
      lookup[list[i]["CommentId"]] = list[i];
      list[i]["Children"] = [];

    }
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i]["ParentId"]) {
        lookup[list[i]["ParentId"]]["Children"].push(list[i]);
      } else {
        tree.push(list[i]);
      }
    }
    return tree;

  };


  submitForm(form: NgForm) {

    console.log(this.entity)
    if (!form.valid)
      return;
    let url = "CommentPanel/Create";

    this.errors = [];
    this.saveSubscription = this._http.Save(url, this.entity, false).subscribe(
      (res: any) => {
        this._publicService.onSuccessMessege(res);
        this.entity   = { ExternalId: this.ExternalId, ParentId: null, Text: "", Title: "", FormType: this.FormType };
this.onRefresh();
      },
      (responseError: HttpErrorResponse) => {
        this.errors = this._publicService.processModelStateErrors(form, responseError);
      });
  }


  ngOnDestroy(): void {
    if (this.saveSubscription != null)
      this.saveSubscription.unsubscribe();



    if (this.getRecordSubscription! != null)
      this.getRecordSubscription.unsubscribe();

  }

}
