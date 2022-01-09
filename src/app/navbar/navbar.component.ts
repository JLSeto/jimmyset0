import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelperService } from '../helpers/services/helper.service';
import { SidenavService } from '../helpers/services/sidenav.service';

declare let gtag: Function;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit 
{
  public title    : string      = 'J.S';
  public navLinks : {desc: string, link: string}[];
  public locSrc   : {desc: string, link: string}[];
  public baseURL  : string = '';
  private _routerSub = Subscription.EMPTY; //Check when the navigation ends, and then get profile info to prevent multiple requests

  constructor(public hS: HelperService, public sidenav: SidenavService, public router: Router, private tS: Title)
  {
    this.locSrc = 
    [
      {desc: '/assets/twitter.svg',      link: 'https://twitter.com/Jset0'               },  
      {desc: '/assets/github.png',       link: 'https://github.com/JLSeto'               }, 
      {desc: '/assets/linkedin.png',     link: 'https://www.linkedin.com/in/jimmy-seto/' }
    ];

    this.navLinks = 
    [
      {desc: 'About',           link: '/'             }, 
      {desc: 'Projects',        link: 'projects/'     }, 
    //   {desc: 'Study Notes',     link: 'notes'         }
    ];
    
    this._routerSub = router.events.subscribe((val) => 
    {
        if(val instanceof NavigationEnd) 
        {
            let url = val.url.split('/');
            this.baseURL = val.url.split('?')[0];
            this.setTitle(url);
        }
    });

  }

  ngOnInit(): void 
  {
    
  }

  toggle()
  {
    this.sidenav.toggle();
  }

  setTitle(url : string[]) : void
  {
    this.tS.setTitle("Jimmy S. " + String(url[1]).charAt(0).toUpperCase() + String(url[1]).slice(1));
  }

  configureGTAG(event : NavigationEnd)
  {
    gtag('config', 'G-3DQVQDVCCQ', 
    {
        'page_path': event.urlAfterRedirects
    });

    // gtag('config', 'G-JBDYNJFL65', 
    // {
    //     'page_path': event.urlAfterRedirects
    // });
  }

}
