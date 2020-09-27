import { Component, OnInit, Input, Inject, OnChanges } from '@angular/core';
import { IAppConfig, APP_CONFIG } from 'src/app/core/services/IAppConfig';
import { BrowserStorageService } from 'src/app/core/services/browser-storage.service';

@Component({
  selector: 'file-download',
  templateUrl: './file-download.component.html' 
 
})
export class FileDownloadComponent implements OnChanges, OnInit {

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private browserStorageService:BrowserStorageService,
  ) { }
  @Input() FileId :string;
  @Input() formType :string;
  @Input() lable :string;
  
  pathServerUrl :string;
  token :string;
  
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.FileId.currentValue != undefined && changes.FileId.currentValue != "" && changes.FileId.currentValue != null) {
      this.FileId=changes.FileId.currentValue;
    
    }
  }

  ngOnInit() {

    this.token  = this.browserStorageService.getSession("access_token");
  
   this.pathServerUrl=this.appConfig.apiEndpoint+this.appConfig.apiSettingsPath+'DownloadFile?a_t='+this.token;

  }

}
