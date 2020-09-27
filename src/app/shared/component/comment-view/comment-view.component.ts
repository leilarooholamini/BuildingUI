import { Component, OnInit,EventEmitter, Input, Inject, Output } from '@angular/core';
import { RecercveFormCommentDto } from '../../Dto/form-omment-dto';
import { APP_CONFIG, IAppConfig } from 'src/app/core/services/IAppConfig';
import { ShareDataService } from '../../service/share-data-service';
 

@Component({
  selector: 'comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss']
})
export class CommentViewComponent implements OnInit {
  @Input() item: RecercveFormCommentDto;
  @Input() depth: number;

   @Output("inputComment")  inputComment = new EventEmitter<RecercveFormCommentDto>();
  imageUrl: string;
  constructor( private shareDataService:ShareDataService,
     @Inject(APP_CONFIG) private appConfig: IAppConfig) {

    this.imageUrl = this.appConfig.imageSrc; 
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
 
  }

  onInsertComment(item:RecercveFormCommentDto){ 
  
    this.shareDataService.DataComment=item;
    this.inputComment.emit(item);
  }

}
