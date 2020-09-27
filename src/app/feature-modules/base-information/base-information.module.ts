import { BaseInformationRoutingModule } from './base-information-routing.module';
 
import { CommonModule } from '@angular/common';
 
 
 
import { EditEnumComponent } from './components/edit-enum/edit-enum.component';
import { EditUnitComponent } from './components/edit-unit/edit-unit.component';
import { EnumComponent } from './components/enum/enum.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UnitComponent } from './components/unit/unit.component';
 
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 
 
export function customHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "../../assets/i18n/", ".json");
}

 
 

@NgModule({
  declarations: [UnitComponent, EditUnitComponent, EditEnumComponent, EnumComponent],
  entryComponents: [EditUnitComponent, EditEnumComponent],
  
  imports: [
    CommonModule,
    SharedModule,
    BaseInformationRoutingModule,
  

  ]
})
export class BaseInformationModule { }
