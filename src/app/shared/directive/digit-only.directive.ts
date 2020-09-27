import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  selector: '[digitOnly]'
})
export class DigitOnlyDirective {
  private decimalCounter = 0;
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];
  @Input("decimal")decimal? = false;
  inputElement: HTMLElement;

  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) || // Allow: Cmd+X (Mac)
      (this.decimal && e.key === '.' && this.decimalCounter < 1) // Allow: only one decimal point
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(e: KeyboardEvent) {
    if (!this.decimal) {
      return;
    } else {
      this.decimalCounter = this.el.nativeElement.value.split('.').length - 1;
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData.getData('text/plain');

    if (!this.decimal) {
      document.execCommand(
        'insertText',
        false,
        pastedInput.replace(/[^0-9]/g, '')
      );
    } else if (this.isValidDecimal(pastedInput)) {
      document.execCommand(
        'insertText',
        false,
        pastedInput.replace(/[^0-9.]/g, '')
      );
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const textData = event.dataTransfer.getData('text');
    this.inputElement.focus();

    if (!this.decimal) {
      document.execCommand(
        'insertText',
        false,
        textData.replace(/[^0-9]/g, '')
      );
    } else if (this.isValidDecimal(textData)) {
      document.execCommand(
        'insertText',
        false,
        textData.replace(/[^0-9.]/g, '')
      );
    }
  }

  isValidDecimal(string: string): boolean {
    return string.split('.').length <= 2;
  }
}


 


@Directive({
  selector: '[ngModel][phone]',
  host: {
    '(ngModelChange)': 'onInputChange($event)'
  }
})
export class MaskDirective {

  constructor(public model: NgControl) {}

  onInputChange(value) {
        var x = value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,3})(\d{0,4})/);
       // value = !x[2] ? x[1] :  x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '');
 
     //  value=  x[3] + ' ' + x[2] +   ' ' + x[1]
      // value = !x[2] ? x[1] :  x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '');
        this.model.valueAccessor.writeValue(value);
  }

}
