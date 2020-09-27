import { Component, OnInit, OnDestroy, forwardRef, Renderer2, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges, SimpleChanges, SimpleChange, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
 

import { Subject, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, tap, debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PublicShareService } from '../../service/public-share-service';

@Component({
  selector: 'mn-select-filter',
  templateUrl: './mn-select-filter.component.html', 
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MnSelectFilterComponent),
    multi: true,
  }]

})
export class MnSelectFilterComponent implements OnInit, OnDestroy,ControlValueAccessor,  OnChanges  {
  
  constructor(private _http: PublicShareService,
    private cdRef: ChangeDetectorRef) {
    
    
  }
  
  @Input() value: string=null;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() apiUrl: string;
  @Input() size: number=50;
  @Input() valueField: string = undefined;
  @Input() labelField: string = undefined;
  @Input() isRequired: boolean = false;
  @Output("valueChange") valueChange = new EventEmitter<string>();
  
private valueFirstLoad:boolean;
  enums: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  public searching: boolean = false;
  private modelChanged: Subject<string> = new Subject<string>();
  protected _onDestroy = new Subject<void>();


  @ViewChild('selectElement', { static: true }) private _selectElement: ElementRef;
  get selectElement(): ElementRef {
    return this._selectElement;
  }


  private _onChange = (_: any) => { };
  private _onTouched = (_: any) => { };

  writeValue(obj: any): void {
 
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

  onChange(event: any) {
  
      
    this._onChange(event.target.value);
   
  }
  onBlur(_: any) {
    this._onTouched(_);
  }
  onSelectChange(item:string){
   // this.valueChange.emit(item);
   this._onChange(item);
 
    
  }
  getValue(item: any) {
    return this.valueField ? item[this.valueField] : item;
  }
  getLabel(item: any) {
    return this.labelField ? item[this.labelField] : item;
  }

 
  
  ngOnInit() {
    
    this.modelChanged
    .pipe(
      distinctUntilChanged(),
        tap(() => this.searching = true),
        takeUntil(this._onDestroy),
        debounceTime(300),
        switchMap(inputValue =>
 
          this._http.getAll(this.apiUrl + "SelectedValue="+this.value+"&DropDownFilter=" + inputValue)))
      .subscribe(users => {
        this.searching = false;
        this.enums.next(users);
      }, error => {
          
        this.searching = false;

      });

     // if(this.value )
     this.modelChanged.next( '');

    //  if(this.valueFirstLoad )
    //  this.modelChanged.next( '');
    
    }
     
  ngOnChanges(changes:  SimpleChanges): void {
  
    // if( (changes.value.previousValue===undefined || changes.value.previousValue===null )  && changes.value.currentValue !=undefined)
    //       this.modelChanged.next( '');
    // if(changes.value.firstChange)
    // this.valueFirstLoad=true;
    // else
    // this.valueFirstLoad=false;
  }
    
    
    onFilterChange(filter: string) {
      
      let Filters = { Field: null, Logic: 'and', Operator: '', Value: null, Filters: [] };
      Filters.Filters.push({ Field: this.labelField, Logic: 'and', Operator: 'contains', Value: filter, Filters: null });

    this.modelChanged.next(encodeURIComponent (JSON.stringify(Filters)));
  }
  
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  
}
