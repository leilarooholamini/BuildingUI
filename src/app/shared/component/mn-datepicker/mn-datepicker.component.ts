 
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
//import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'mn-datepicker',
  templateUrl: './mn-datepicker.component.html',
  styleUrls: ['./mn-datepicker.component.css'],
  providers: [
      //   {provide: DateAdapter, useClass: AppDateAdapter},
      // {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},

    // {
    //   provide: NG_VALIDATORS,
   //    useExisting: forwardRef(() => MNDatePickerComponent),
   //    multi: true
  // },
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MNDatePickerComponent),
    multi: true,
  }]
})
export class MNDatePickerComponent implements OnInit ,Validator, ControlValueAccessor {



    appDatePickerControl: FormControl;
    picker: FormControl;
    value;
    @Input() disabled?= false;

    @Input("mindate") minDate:string ;
  @Input("max_date") maxDate: string ;
  @Input() isRequired: boolean = false;
  @Input() id: string;
  @Input() placeholder: string = '';
  constructor(
    ) { }
  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit() {
      this.appDatePickerControl = new FormControl('', []);
  }

  writeValue(value: any) {
      this.value = value;
  }

  registerOnChange(fn: (value: any) => void) {
      this.onChange = fn;
  }

  registerOnTouched(fn: any) {
      this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
      this.disabled = isDisabled;
      if (isDisabled) {
          this.appDatePickerControl.disable();
      } else {
          this.appDatePickerControl.enable();
      }
  }

  validate(control: FormControl) {
      const errors = Object.assign({}, this.appDatePickerControl.errors || {});
      return Object.keys(errors).length ? errors : null;
  }

  blurred() {
    this.appDatePickerControl.markAsTouched();
  }

  onKey(event: any) {
    const inputText = event.currentTarget.value;
      if (inputText.length === 8 && !(inputText.includes('/') || inputText.includes('-'))) {
          this.value = new Date(inputText.substring(0, 2) + '/' + inputText.substring(2, 4) + '/' + inputText.substring(4, 8));
        }
  }
}
