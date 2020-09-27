import { Component, OnInit, Input, EventEmitter, Output, forwardRef, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { NgForm, ControlContainer, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
 

@Component({
  selector: 'mn-number-input',
  templateUrl: './mn-number-input.component.html',
  styleUrls: ['./mn-number-input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MnNumberInputComponent),
    multi: true,
  }]
})
export class MnNumberInputComponent implements OnInit , ControlValueAccessor {
  
  constructor(
    private _renderer: Renderer2
  ) { }
  

  value: string = '';
  @Input("widthControl") width: number=200; 
  @Input("minlength") minlength:number=0;
  @Input("isDecimal") isDecimal=false;
  @Input("max_Length") maxLength: number=400; 
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
 
}
