 

export interface RecercveFormCommentDto {
    CommentId: string;
    Title: string;
    Text: string;
    ExternalId: string;
    UserUnitName: string;
    ParentId: string;
    InsertDate: any;
    ImageUser: string;
    Children?:RecercveFormCommentDto[];

}


export interface CreateCommentDto {
  
    Title: string;
    Text: string;
    ExternalId: string; 
    ParentId: string;
    FormType:string;
    

}