import { Injectable } from '@angular/core';
import { TreeDTO } from 'src/app/feature-modules/base-information/Dto/UnitDto';
import { RecercveFormCommentDto } from '../Dto/form-omment-dto';

 
@Injectable()
export class ShareDataService {

  constructor( ) {
    
   }

  DateNode:TreeDTO;
  CheckBoxDataNode:TreeDTO[]=[];
  DataComment:RecercveFormCommentDto;
}
