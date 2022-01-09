import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HelperService } from '../helpers/services/helper.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss']
})

export class FrontpageComponent implements OnInit 
{
    public  faviconImg : string = '/assets/favicon.png';
    private resume     : string = '/assets/Jimmy_ResumeS.pdf';
    public  mailTo     : string = 'mailto:jseto@jimmyseto.com';
    
    constructor(public hS : HelperService, public cd: ChangeDetectorRef)
    {

    }

    ngOnInit(): void 
    {

    }

    public downloadResume() : void
    {
        let link = document.createElement('a');
        link.href = this.resume;
        link.download = "JimmySeto_Resume.pdf";
        link.click();
        link.remove();
    }
}