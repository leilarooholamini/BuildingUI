import {Injectable} from '@angular/core';
import {WaMatConfirmDialogDefaults} from '@webacad/material-confirm-dialog';
 
@Injectable()
export class UnsureConfirmDialogDefaults implements WaMatConfirmDialogDefaults
{
    
    
    public trueButtonTitle: string = 'تایید';
    
    public falseButtonTitle: string = 'انصراف';
    
}