import { Component, OnInit, Output, EventEmitter, Input, OnChanges, Inject, SimpleChanges, AfterViewInit } from '@angular/core';
import { transition, animate, state, style, trigger } from '@angular/animations';

import { HttpEventType } from '@angular/common/http';


import { PublicShareService } from '../../service/public-share-service';
import { APP_CONFIG, IAppConfig } from 'src/app/core/services/IAppConfig';
 


@Component({
  selector: 'mn-image-upload',
  templateUrl: './mn-image-upload.component.html',
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
export class MnImageUploadComponent implements OnInit, OnChanges, AfterViewInit {


  constructor(private publicShareService: PublicShareService, @Inject(APP_CONFIG) private appConfig: IAppConfig) { }
  @Output() imageInputChange = new EventEmitter<any>();
  //@Output() imageChange = new EventEmitter<any>();
  @Input("imageInput") imageInput: string
  ngOnInit() {
  }

  image = 'assets/images.jpg'

  imageState = "NewFile";
  fileToUpload: File;
  progress: number = 0;
  fileChangeEvent(input: any) {

    if (input.target.files && input.target.files.length > 0) {
      this.imageState = "ReadyToUpload"
      this.fileToUpload = <File>input.target.files[0];
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(input.target.files[0]);

    }
  }

  ngAfterViewInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {

    if (changes.imageInput.currentValue != undefined && changes.imageInput.currentValue != "" && changes.imageInput.currentValue != null) {
      setTimeout(() => {
        this.publicShareService.getbyId("ImageFileUploadPanel", this.imageInput).subscribe(res => {
          this.image = this.appConfig.imageSrc + res;
          this.imageState = "IsDeleteFile";
        });
      });
      //this.image=this.imageInput;
    }
  }

  onUpload() {
    this.imageState = "";
    const formData = new FormData();
    formData.append('Image', this.fileToUpload, this.fileToUpload.name);
    this.publicShareService.uploadFile("ImageFileUploadPanel", formData).subscribe((event) => {
      debugger;
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);

      }
      else {
 
        if (event.status == 201 && event.body !== null && event.body !== undefined) {
          this.imageState = "IsDeleteFile";
          this.imageInputChange.emit(event.body.FileId);

        }
      }
    });
  }

  onDelete() {
    this.image = 'assets/images.jpg';
    this.imageState = "NewFile";
    this.imageInputChange.emit(null);
    this.progress = 0;
  }
}


