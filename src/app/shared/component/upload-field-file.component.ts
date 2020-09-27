import { APP_CONFIG, IAppConfig } from 'src/app/core/services/IAppConfig';
import { Component, ElementRef, Inject, ViewChild, OnChanges, SimpleChanges, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';


import { HttpEventType } from '@angular/common/http';
import { PublicShareService } from 'src/app/shared/service/public-share-service';

@Component({
  selector: 'mn-file-upload',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: UploadFileComponent, multi: true },
      
  ],
  template: `
   
    <input type="file" #fileInput style="display: none" (change)="fileChangeEvent($event)"  >
    <span> {{placeholder | translate}} </span>
  
    
    <a mat-mini-fab color="primary" *ngIf="imageState=='NewFile'" (click)="fileInput.click()">

    <mat-icon matSuffix>attach_file</mat-icon>
    </a>


    <a mat-mini-fab color="warn" *ngIf="imageState=='IsDeleteFile'" (click)="onDelete()">
        <mat-icon>delete</mat-icon>
    </a>

 
    <span  style="color:green;" >   {{orgFileName}} </span>
<br/>
<mat-progress-bar mode="determinate" *ngIf="progress!=0" [value]="progress"></mat-progress-bar> {{progress}}%
 `,
  animations: [
    trigger('selectedImage', [
      state('hideImage', style({
        opacity: 0,
      })),
      state('showImage', style({
        opacity: 1
      })),
      transition('showImage=>hideImage', [
        animate(0)
      ]),
      transition('hideImage=>showImage', [
        animate(650)
      ])
    ])
  ]
})
export class UploadFileComponent   implements OnChanges, ControlValueAccessor {
  
  constructor( private publicShareService:PublicShareService){
  
 
  }
  
  @Input("placeholder") placeholder: string = '';
  @Input("formType") formType: string = '';
  @Output() fileupInputChange = new EventEmitter<any>();
  //@Output() imageChange = new EventEmitter<any>();
  @Input("fileupInput") fileupInput: string
  //  formControl: import("@angular/forms").AbstractControl;
  fileToUpload: File;
  progress: number = 0;
  fileId :string;
  orgFileName:string;
  filename:string;
  imageState = "NewFile";
  @ViewChild('fileInput') fileInput : ElementRef;
 @ViewChild('fileText') fileText : ElementRef;
 
 fileChangeEvent(input: any) {
   if (input.target.files && input.target.files.length > 0) {
     this.onUpload(input);
     // this.imageState = "IsDeleteFile"
     
    }
  }
  
  
  
  onDelete() { 
    this.imageState = "NewFile";
    this.fileInput.nativeElement.value=null;
    this.fileupInputChange.emit(null);
    this.orgFileName= this.fileId= this.filename=null;
    this.progress=0;
    this.writeValue(null);
  }
  
  
  onUpload(input: any) {
    this.imageState = "";
    const formData = new FormData();
    formData.append('File', <File>input.target.files[0], input.target.files[0].name);
    this.publicShareService.uploadFile("FileUploadPanel?formType="+this.formType, formData).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
        
      }
      else {
        
        if (event.status == 201 && event.body !== null && event.body !== undefined) {
          this.imageState = "IsDeleteFile";
          this.fileId = event.body.FileId ;
          this.fileupInputChange.emit(event.body.FileId);
          this.filename= event.body.FileFullName
          this.orgFileName=event.body.FileName
       //   console.log(event.body);
          
        }
      }
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {

    if (changes.fileupInput.currentValue != undefined && changes.fileupInput.currentValue != "" && changes.fileupInput.currentValue != null) {
      setTimeout(() => {
        this.publicShareService.getbyId("FileUploadPanel", this.fileupInput).subscribe(res => {
          this.orgFileName =  res
       //   console.log(res);
       this.imageState = "IsDeleteFile"
        });
      });
      //this.image=this.imageInput;
    }
  }
  
  onChange = (_:any) => { 
      
    if (_.target.files && _.target.files.length > 0) {
      this.filename=_.target.files[0].name;
      this.imageState = "IsDeleteFile"
      
    }
  };
  onTouched = (_:any) => { };
  
  writeValue(value) {
    
  }
  
  
  
  
  
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
  
}
