import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, forwardRef } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm, NgModel } from '@angular/forms';

import { endWith } from 'rxjs/operators';

@Component({
  selector: 'mninput',
  templateUrl: './mninput.component.html',
  styleUrls: ['./mninput.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MNInputComponent),
    multi: true,
  }]
})
export class MNInputComponent implements OnInit , ControlValueAccessor {

  constructor(
    private _renderer: Renderer2
  ) { }


  value: string = '';
  @Input("widthControl") width: number=300;
  @Input("minlength") minlength:number=0;
  @Input("max_Length") maxLength: number=400;
  @Input() type: string = 'text';
  @Input() isRequired: boolean = false;
  @Input() id: string;
  @Input() placeholder: string = '';
  @ViewChild("inputElement") private _inputElement: ElementRef;
  get inputElement(): ElementRef {
    return this._inputElement;
  }

  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  widthcontrol:number;

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
    this._renderer.setProperty(this._inputElement.nativeElement, 'disabled', isDisabled);
  }

  onChange(event: any) {
    this._onChange(event.target.value);
  }
  onKeyup(event: any) {
    this._onChange(event.target.value);
  }
  onBlur(event: any) {
    this._onTouched();
  }

  ngOnInit(): void {
   if(this.width==100)
    this.widthcontrol=250;
    else
    this.widthcontrol=this.width;
  }




  // @Input("inputModel") inputModel: string;
  // @Input("max_Length") maxLength: number=20;
  // @Input("widthControl") width: number=200;
  // @Input("title") title: string;
  //  @Input("isNumeric") isNumeric: boolean;
  // @Output("inputModelChange") inputModelChange = new EventEmitter<string>();

  // widthcontrol:number;
  // totalCharLengthText: string
  // textCount: number;

  // ngOnInit() {
  //   this.widthcontrol=this.width;
  //   this.textCount = this.inputModel.length;
  //   this.totalCharLengthText = (this.maxLength==0)?'Unlimited':(this.maxLength).toString();

  // }


  // textChange(){
  //   this.inputModelChange.emit(this.inputModel);
  //   this.textCount = this.inputModel.length;
  // }

  // numberOnly(event:any): boolean {
  //   if(!this.isNumeric) return true;
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !=46 ) {
  //     return false;
  //   }
  //   return true;
  // }



}
