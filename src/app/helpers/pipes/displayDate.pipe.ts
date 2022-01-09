import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'displayDate'
})

export class DisplayDatePipe implements PipeTransform 
{
    private displayLang  = 'en-US'//'ja-JP';
    private date_options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    constructor(){}

    transform(date: any) : string
    {
      if(!date)
      {
        return '';
      }
      else
      {
        return new Date(date).toLocaleDateString(this.displayLang, this.date_options);
      }
    }
}