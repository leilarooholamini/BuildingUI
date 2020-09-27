import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, forwardRef, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

import { PublicShareService } from '../../service/public-share-service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'mn-combo-box',
  templateUrl: './mncombo-box.component.html',
  styleUrls: ['./mncombo-box.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [

    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MNComboBoxComponent),
      multi: true
    }
  ]
})
export class MNComboBoxComponent implements OnInit, ControlValueAccessor,OnChanges {
 
  @Input() multiple: boolean = false;
  @Input() value: any;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() apiUrl: string;
 
  @Input() valueField: string = undefined;
  @Input() labelField: string = undefined;
  @Input() isRequired: boolean = false;
 
  


  enums: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  selectedItem = '';
  private parseError: boolean;

  private _onChange = (_: any) => { };
  private _onTouched = (_: any) => { };

  constructor(private _http: PublicShareService,
    private cdRef: ChangeDetectorRef,
    private _renderer: Renderer2
  ) { }



  ngOnInit(): void {

    // if(this.apiUrl!=undefined)
    // this.onRefresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
 
      
    if (changes.apiUrl.currentValue!=undefined) {
      this.apiUrl = changes.apiUrl.currentValue;
      this.onRefresh();
    }
  }
  onRefresh(){

    setTimeout(() => {
      this._http.getAll(this.apiUrl)
        .subscribe(users => {
          this.enums.next(users);
        }, error => {

        });

    });
  }


  writeValue(obj: any): void {

    this.value = obj;
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }

  registerOnTouched(fn) {
    this._onTouched = fn;
  }


  onClickOption(item: any) {

    this._onChange(item[this.valueField]);
    this._onTouched(item[this.valueField]);


  }
  change(e) {
    //console.log(e);
    this._onChange(e);
    this.cdRef.markForCheck();
  }
 

  getValue(item: any) {
    return this.valueField ? item[this.valueField] : item;
  }
  getLabel(item: any) {
    return this.labelField ? item[this.labelField] : item;
  }

}
