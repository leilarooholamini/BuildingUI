import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BehaviorSubject } from 'rxjs';
import { Router, Event, NavigationEnd } from '@angular/router';
import { GridRequest, GridSort, GridColumn, FilterGridRequest } from 'src/app/base-class/grid-classes';
 


@Injectable()
export class PublicService {
  constructor(private _snackBar: MatSnackBar, private router: Router ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }


  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);


  currentUserId: string

  historyCryptoCurencyPrice: any[] = [];

  titleForDelete = "آیا از حذف رکورد مورد نظر مطمئن هستید؟";
  itemsPerPage = 10;
  refreshTime = 60;
  onSuccessMessege(messege: string) {
    this._snackBar.open(messege, null, { duration: 3000, panelClass: ["mat-snack-bar-container-success"] });
  }
  onErorMessege(messege: string) {
    this._snackBar.open(messege, null, { duration: 3000, panelClass: ["mat-snack-bar-container-danger"] });
  }
  onInfoMessege(messege: string) {
    this._snackBar.open(messege, null, { duration: 3000, panelClass: ["mat-snack-bar-container-info"] });
  }
  onWarningMessege(messege: string) {
    this._snackBar.open(messege, null, { duration: 3000, panelClass: ["mat-snack-bar-container-warning"] });

    //   this.toastrService.warning(messege,"سامانه",{closeButton:true,progressBar:true});
  }
  processModelStateErrors(form: NgForm, responseError: HttpErrorResponse) {

    let errors: string[] = [];
    if (responseError["statusCode"] === 400) {
      if (responseError.error.Message != undefined)
        if (responseError.error.Message != "The request is invalid.")
          errors.push(responseError.error.Message);
      const modelStateErrors = responseError.error;
      for (let fieldName in modelStateErrors.ModelState) {
        if (modelStateErrors.ModelState.hasOwnProperty(fieldName)) {
          const modelStateError = modelStateErrors.ModelState[fieldName];
          fieldName = fieldName.replace("entity.", "");
          const control = form.controls[fieldName] || form.controls[this.lowerCaseFirstLetter(fieldName)];

          if (control) {
            errors.push(modelStateError);
            let StateError = modelStateError[0];
            control.setErrors({
              modelError: { error: StateError }
            });
          } else {


            errors.push(modelStateError);
          }
        }
      }
    } else {

      if (responseError["statusCode"] === 409)
        errors.push(responseError.error);
    }
    return errors;
  }

  lowerCaseFirstLetter(data: string): string {
    return data.charAt(0).toLowerCase() + data.slice(1);
  }


  onGridSort(query: GridRequest, columnName: string): GridRequest {
    //let q1: GridRequest={PageSize:10,Page:1, Sort:[],Filters:null}

    if (query.Sort.some(x => x.Field == columnName)) {
      if (query.Sort.some(x => x.Field == columnName && x.Dir == "asc"))
        query.Sort.find(x => x.Field == columnName).Dir = "desc";

      if (query.Sort.some(x => x.Field == columnName && x.Dir == "desc"))
        query.Sort.splice(query.Sort.findIndex(x => x.Field == columnName));
    } else {
      query.Sort.push(new GridSort('asc', columnName))
    }
    return query;

  }



  onGridFilter(query: GridRequest, columns: GridColumn[], propertyName: string, input: any, Operator: string): FilterGridRequest {

    let infoColumn = columns.find(c => c.propertyName == propertyName);
    let filterValue = undefined;
    debugger;
    if (input != undefined)
      switch (infoColumn.type) {
        case "string": { 
            filterValue = input;
           break; 
        }
        case "number":  
            filterValue = input;
          break;

          case "date":  
          debugger;
          filterValue=this.formatDate(input);  //new Date(input.substring(0, 2) + '/' + input.substring(2, 4) + '/' + input.substring(4, 8));
        /// = input;
        break;
        case "bool": {
          filterValue = input;
          break;
        }
        default: {
          filterValue = undefined;
          break;
        }
      }
    if (filterValue == undefined && infoColumn.type == "string")
      filterValue = input;

    if (query.Filters === null && (filterValue === null || filterValue === undefined || filterValue == ""))
      return { gridRequest: query, isRefreshGird: false }

    if (filterValue != "" || filterValue != undefined) {
      if (query.Filters === null)
        query.Filters = { Field: null, Logic: 'and', Operator: '', Value: null, Filters: [] };

      if (query.Filters.Filters.length > 0)
        if (query.Filters.Filters.some(c => c.Field == propertyName)) {
          let indexFilter = query.Filters.Filters.findIndex(c => c.Field == propertyName);
          query.Filters.Filters.splice(indexFilter, 1);
        }
      if (filterValue != "")
        if (filterValue != undefined)
          query.Filters.Filters.push({ Field: propertyName, Logic: 'and', Operator: Operator, Value: filterValue, Filters: null });

      if (query.Filters.Filters.length == 0)
        query.Filters = null;
      query.Page = 1;
      return { gridRequest: query, isRefreshGird: true }
    } else {
      if (query.Filters == null)
        return { gridRequest: query, isRefreshGird: false }
      let indexFilter = query.Filters.Filters.findIndex(c => c.Field == propertyName);
      query.Filters.Filters.splice(indexFilter, 1);
      if (query.Filters.Filters.length == 0) {
        query.Filters = null;
        query.Page = 1;
      }
    }

    return { gridRequest: query, isRefreshGird: true }
  }

    formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}




}