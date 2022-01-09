import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-iframesrc',
    templateUrl: './iframe-view.html',
    styleUrls: ['./projects.component.scss']
  })
export class iFrameView
{
    public x: any = (Math.random()).toString();
    public _iframeSrc: SafeHtml = '';
    
    @Input() set iframeSrc( s: string)
    {
      this._iframeSrc = this.dom.bypassSecurityTrustResourceUrl(s);
    }

  constructor(private dom: DomSanitizer) 
  {

    
  }

  ngOnInit() 
  {

  }

}