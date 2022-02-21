import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumber {

  constructor(private el: ElementRef) { }

  @Input() OnlyHex: boolean = false;
  @Input() OnlyBinary: boolean = false;
  @Input() OnlyNumber: boolean = false;
  @Input() nodecimal: boolean = false;
  @Input() onedecimal: boolean = false;

  numOnly = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '~'];
  binOnly = ['0', '1'];
  hexOnly = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
             'A', 'B', 'C', 'D', 'E', 'F', 'X',
             'a', 'b', 'c', 'd', 'e', 'f', 'x']

  @HostListener('keydown', ['$event']) onKeyDown(event: any) 
  {
    let e = <KeyboardEvent> event;
    if((this.nodecimal || this.onedecimal == false) && e.key == '.')
    {
      e.preventDefault();
    }

    if(this.onedecimal)
    {
      let x = this.el.nativeElement.value;

      if(x.includes('.'))
      {
        if(e.key == '.')
        {
          e.preventDefault();
        }

        if(x.length - x.indexOf('.') == 3 && this.numOnly.includes(e.key))
        {
          e.preventDefault();
        } 
      }
    }

    if (this.OnlyNumber || this.OnlyBinary || this.OnlyHex) 
    {
      if (['Delete', 'Backspace', 'Tab', 'Escape', 'Enter', '.'].indexOf(e.key) !== -1 ||
        // Allow: Ctrl+A
        (e.code == 'KeyA' && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.code == 'KeyC' && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.code == 'KeyX' && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.code == 'Home' || e.code == 'End' || e.code == 'ArrowLeft' || e.code == 'ArrowRight')) 
          {
            // let it happen, don't do anything
            return;
          }

        
        if(this.OnlyHex && (!this.hexOnly.includes(e.key)))
        {
          e.preventDefault();
        }
        // Ensure that it is a number and stop the keypress
        if (this.OnlyNumber) 
        {
          if(!this.numOnly.includes(e.key))
          {
            e.preventDefault();
          }

          if((this.el.nativeElement.value).includes('-') && e.key == '-')
          {
            e.preventDefault();
          }
            
        }



        if(this.OnlyBinary && (e.shiftKey || !this.binOnly.includes(e.key)))
        {
            e.preventDefault();
        }
    }
  }
}