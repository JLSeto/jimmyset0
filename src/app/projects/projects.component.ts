import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Details, Projects } from '../helpers/models/models';
import { HelperService } from '../helpers/services/helper.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit 
{
    public filterButtons: string[] = ['All', 'Hardware', 'Web Components'];
    public selectedFB   : string   = this.filterButtons[0];
    public currentRoute : string | null;
    public currentURL   : string = '';
    public iframeSrc?   : string;
    public gitSrc?      : string;
    public arrProjects  : Projects[];
    private _routerSub  : Subscription = Subscription.EMPTY; //Check when the navigation ends, and then get profile info to prevent multiple requests

    constructor(public hS: HelperService, public route: ActivatedRoute, private router: Router, 
        private cfr: ComponentFactoryResolver, private dom: DomSanitizer)
    {
        this.currentRoute = this.route.snapshot.paramMap.get('title');
        this.arrProjects = 
        [
            {
                type           : ["Web Components"],
                image          : "/assets/frogger/froggerScreen.png", 
                title          : "Frogger",
                date           : new Date("August 08, 2021"),
                subtitle       : "TypeScript, JavaScript, HTML, CSS", 
                description    : "A Frogger game from Udacity's Nanodegree Web Development. The project was initially in JavaScript but ported over to TypeScript!",
                link           : "frogger",
                details        :    [
                                        { 
                                            heading   : 'Overview', 
                                            notes     : `This frogger game is based off of Udacity's frontend nanodegree arcade game.
                                                        I initially did the project  in JavaScript but ported it over to 
                                                        TypeScript so that it could be integrated with this website (which is based off Angular). The objective of the game is to 
                                                        reach the key without getting hit by
                                                        the moving bugs.  If you get hit by a bug, you will start back in your initial position.  If you
                                                        reach the key, the level will be regenerated but now with more bugs!`,
                                        },
                                        {
                                            heading   : 'How it Works', 
                                            notes     : `The game consists of three layers: the engine, the resources, and the application.
                                                        The engine works by drawing the entire game screen over and over again.  
                                                        The resources is an image loading utility which eases the process of loading images
                                                        to be used within the game.  The app layer consists of the player, the enemies, and the key. 
                                                        It initializes the location of our objects on the game field and handles the event listeners
                                                        like when we press a key.`
                                        }
                                    ],
                demo           :    
                                    {
                                        heading   : 'Demo', 
                                        video     : '',
                                        git       : 'https://github.com/JLSeto/JLSeto.github.io/tree/master/src/app/frogger'
                                    },
                hardware       :    [],
                software       :    [
                                        'TypeScript',
                                        'JavaScript',
                                        'Html',
                                        'CSS'
                                    ],
                references     :    [
                                        {link: 'https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true', title: 'Project Guide'},
                                        {link: 'https://review.udacity.com/#!/projects/2696458597/rubric'     , title: 'Rubric'}
                                    ],
            },
            {
                type           : ["Web Components"],
                image          : "/assets/voiceGengo/voiceGengo.png", 
                title          : "Voice Gengo",
                date           : new Date("March 08, 2021"),
                subtitle       : "Full Stack Web Development, Angular, Typescript, Node.js, MongoDB, OWASP, Localization, Stripe API, Web Sockets", 
                description    : "A community voice app for Japanese and English aimed to help improve pronunciation",
                link           : "voiceGengo",
                details        :    [
                                        { 
                                            heading   : 'Overview', 
                                            notes     : `Voice Gengo is a full stack web development project I did with the aim
                                                        of helping people speak a language better.  The app currently supports 2 languages:
                                                        English and Japanese.  In the app you can create posts, write notebooks,
                                                        and record yourself speaking the language you are learning.  You are also able to 
                                                        share your posts, notes, or recordings with Native Speakers of the language.  
                                                        While all of these features are free to use, I did include paid
                                                        features such as scheduling lessons with a tutor and getting voice recordings 
                                                        or notebook entries corrected.  Unfortunately, the website was not a hit (possibly I had a very niche field
                                                        or maybe I did not market it well enough).  However, going through the entire 
                                                        process of building out the entire frontend and backend while following OWASP security practices
                                                        and deploying it on Google Cloud Compute was a great learning experience.  The site is currently online 
                                                        and is available at 
                                                        <a href="https://voicegengo.com" target="_blank">VoiceGengo.com</a>`,
                                            img        :    '/assets/voiceGengo/voiceGengoScreen.png'
                                        },
                                        {
                                            heading   : 'About', 
                                            notes     : `<a href="https://voicegengo.com/about">VoiceGengo.com/about</a>`
                                        }
                                    ],
                demo           :    
                                    {
                                        heading   : '', 
                                        video     : '',
                                        git       : ''
                                    },
                hardware       :    [],
                software       :    [
                                       'TypeScript',
                                       'JavaScript',
                                        'MongoDB',
                                        'Express',
                                        'Angular',
                                        'Node.js',
                                        'Stripe API',
                                        'Socket.io',
                                        'Amazon Web Services',
                                        'Google Cloud',
                                        'Google Analytics'

                                    ],
                references     :    [
                                        {link: 'https://cheatsheetseries.owasp.org/', title: 'OWASP Cheat Sheet'},
                                        {link: 'https://stripe.com/',                 title: 'Stripe'},
                                        {link: 'https://socket.io/',                  title: 'Socket Io'},
                                    ],
            },
            {
                type           : ["Hardware"],
                image          : "/assets/microController/arduino101/arduino101.jpg", 
                title          : "IoT MEAN App (RESTful API server and Arduino101)",
                date           : new Date("December 12, 2017"),
                subtitle       : "Bluetooth Low Energy, Arduino, Sensor Collection", 
                description    : "An IoT web application built using restful API that displays data collected from Arduino 101",
                link           : "IoT-Arduino101",
                details        :    [
                                        { 
                                            heading   : 'Overview', 
                                            notes     : `The Arduino101 is a microcontroller board that is based off of the Intel Curie Module which includes 
                                            the Intel Quark Microcontroller C1000. This board comes with a 6-axis accelerometer/gyrometer and also 
                                            has built in Bluetooth low Energy (BLE). For this project, the Arduino101 is set up to collect acceleration 
                                            and gyrometer data, and then advertise the data over BLE. A client device is setup to connect to the Arduino101 
                                            via bluetooth, read the advertised data, and then send that data over wifi to a server. 
                                            The server stores the received data in a database and also forwards it to a webpage where 
                                            the data is graphed and displayed for the user. From the webpage, a user can also control 
                                            the Arduino101’s sampling frequency. With a click of a button, the user can send a new sampling time all 
                                            the way back to the Arduino101. The change is instantaneous and can be visually seen on the webpage. 
                                            The below diagram illustrates a general overview of this project.`,
                                            img       : '/assets/microController/arduino101/arduino101_diagram_db.png'
                                        },
                                        {
                                            heading   : 'How it Works', 
                                            notes     : `<div class="h3-deep">Arduino101</div>
                                            Standard Arduino code along with the “CurieBLE” and “CurieIMU” libraries were used to write the code for 
                                            the Arduino101 board. The board is set up as a peripheral with one service that contains seven characteristics. 
                                            One characteristic is the sampling frequency (ts) which the user can write values to, and the other six are the 
                                            acceleration/gyrometer values (ax, ay, az, gx, gy, gz). These service and characteristics are each assigned a UUID 
                                            which is used by the client device to connect, subscribe, read, write, or receive notifications for a particular characteristic.
                                            <div class="h3-deep">Client Device</div>
                                            On my client device, Node.js along with Noble is used to search and connect to the Arduino101 over BLE. 
                                            Once the client device finds the Arduino101, it looks under the assigned Service UUID for each Characteristic UUID. 
                                            Notifications are then turned on for each characteristic, and Socket.io is used to forward the sampling frequency and 
                                            accelerometer/gyrometer data to my server. One interesting point to note here is the use of Socket.io over WebSockets. 
                                            The main reason why Socket.io is used over Websockets in this project is because of multiplexing. Socket.io’s API makes 
                                            it quite easy to send multiple signals over one channel while doing this with Websockets is a little more complex.
                                            <div class="h3-deep">Server / Webpage</div>
                                            Node.js along with Express is used to set up my server and MongoDB is used as my database. Socket.io once again forwards 
                                            the data from my server to my webpage, where the raw data values are displayed and graphed for the user. From the webpage, 
                                            the user can also choose to change the sampling frequency of the Arduino101. These effects take place nearly instantaneously 
                                            thanks to Socket.io and Noble. The user can also see this change visually on the webpage where the rate of the incoming data 
                                            will either speed up or slow down based on the new sampling time chosen. The webpage was created using frameworks such as Bootstrap 
                                            and Angularjs. Google Charts is used to graph the acceleration values in real time. The project is available on github and a demo 
                                            is available on youtube.`
                                        }
                                    ],
                demo           :    
                                    {
                                        heading   : 'Demo', 
                                        video     : 'https://www.youtube.com/embed/x961tXPIoRY',
                                        git       : 'https://github.com/JLSeto/Arduino101'
                                    },
                hardware       :    ['Arduino101', 'Laptop (Ubuntu OS)', 'Intel Edison or Raspberry Pie'],
                software       :    [
                                        'Node.js',
                                        'Socket.io',
                                        'Noble',
                                        'Express',
                                        'Angularjs',
                                        'BootStrap',
                                        'Google Charts',
                                        'HTML', 
                                        'CSS', 
                                        'JavaScript'
                                    ],
                references     :    [
                                        {link: 'https://www.arduino.cc/en/Reference/CurieBLE'                                       , title: 'CurieBLE'},
                                        {link: 'https://www.rabbitmq.com/blog/2012/02/23/how-to-compose-apps-using-websockets/'     , title: 'Multiplexing using Websockets'},
                                        {link: 'https://www.npmjs.com/package/node-red-contrib-scx-ibmiotapp'   , title: 'Google Charts'},
                                    ],
            },
            {
                type           : ["Hardware"],
                image          : "/assets/microController/cc2650/cc2650.jpg", 
                title          : "IoT-CC2650",
                date           : new Date("December 5, 2017"),
                subtitle       : "IoT with Texas Instrument CC2650 SensorTag", 
                description    : "An IoT web application built using restful API that displays data collected from Texas Instrument CC2650 SensorTag",
                link           : "IoT-CC2650",
                details        :    [
                                        { 
                                            heading   : 'Overview', 
                                            notes     : `Texas Instrument’s CC2650 SensorTag is a sensor that captures real world data such as acceleration and 
                                                        temperature and allows for quick IoT programming. The SensorTag is easily configured to connect over bluetooth 
                                                        to your phone via a downloadable TI SensorTag App. The app displays the captured data freely to the user, and also 
                                                        allows you to forward that data to IBM’s Quick start server via wifi with a switch of a button. IBM’s platform can 
                                                        then be used to analyze the data as well as write and host our IoT application. However, in this project, Node-Red and 
                                                        Websockets are used to pull the data from IBM’s website and display it in our own website. 
                                                        The below digram shows and an overall view of this demo and the part this project is focused on.`,
                                            img       : "/assets/microController/cc2650/cc2650_diagram.png"
                                        },
                                        {
                                            heading   : 'How it Works', 
                                            notes     : `Node.js is used as my server and integrates Node-Red - a programming tool 
                                                        with a graphical interface that allows you to just connect programming objects like a 
                                                        flow diagram. To retrieve data from IBM’s platform in Node-red, I mainly use then ibmiotapp module, 
                                                        and then connect that to my websocket module which sends the data to my server. The server 
                                                        then forwards that data via websockets to my website where the raw values are displayed using some simple 
                                                        javascript, css, and html. Google Charts is also used in my website to graph the x, y, and z acceleration data 
                                                        in real time. This project is available on github and a demo is available on youtube.`,
                                            img       : "/assets/microController/cc2650/middleware.png"
                                        },

                                    ],
                demo           :    
                                    {
                                        heading   : 'Demo', 
                                        video     : 'https://www.youtube.com/embed/2XyzMGU4GSo',
                                        git       : 'https://github.com/JLSeto/CC2650'
                                    },
                hardware       :    ['Texas Instruments CC2650 SensorTag', 'SmartPhone with “TI SensorTag” Application', 'Laptop running Linux (Ubuntu OS)'],
                software       :    ['Node.js', 'Node-Red', 'BootStrap', 'HTML', 'CSS', 'JavaScript'],
                references     :    [
                                        {link: 'http://www.ti.com/tool/CC2650STK'                               , title: 'Texas Instrument’s CC2650 SensorTag'},
                                        {link: 'https://nodered.org/'                                           , title: 'Node-Red'},
                                        {link: 'https://github.com/websockets/ws'                               , title: 'WebSockets'},
                                        {link: 'https://www.npmjs.com/package/node-red-contrib-scx-ibmiotapp'   , title: 'ibmiotapp'},
                                        {link: 'https://www.npmjs.com/package/node-red-contrib-scx-ibmiotapp'   , title: 'Google Charts'},
                                    ],
            },
            {
                type           : ["Web Components"],
                image          : "/assets/jekyll/jekyll.png", 
                title          : "Static Website with Jekyll",
                date           : new Date("November 11, 2017"),
                subtitle       : "Jekyll, BootStrap, Html, CSS, JavasScript, Github Pages, Google Analytics", 
                description    : "A static website built using Jekyll hosting old projects",
                link           : "static-jekyll",
                details        :    [
                                        { 
                                            heading   : 'Overview', 
                                            notes     : `This website was created using Jekyll and is hosted on github. 
                                                        Jekyll is a static website generator, and allows you to quickly create a blog 
                                                        with some html and css. There are a lot of tutorials and examples 
                                                        online on how to get set-up and started. For my website, 
                                                        I use Bootstrap as a frontend framework which makes the 
                                                        site quite compatible with mobile devices. Bootstrap also has 
                                                        nice features such as navigation bars and jumbotrons. Font Awesome is used 
                                                        for the social icons in the navigation bar, and SASS is 
                                                        used to organize some of my custom CSS files.
                                                        To create the Japanese version of this site, I create a 
                                                        duplicate entry for each corresponding English page and assign 
                                                        each corresponding entry a reference id. A small script is then written in Jekyll’s Liquid to sort the pages, 
                                                        and deliver the corresponding translation page to the one currently loaded. This feature can be accessed from the Navigation bar. 
                                                        The source code for my website is available on my github. <br>
                                                        <a target="_blank" href="https://jlseto.github.io">jlseto.github.io</a>`,
                                            img       : "/assets/jekyll/jekyll.png"
                                        }

                                    ],
                hardware       :    [],
                software       :    ['Html', 'CSS', 'JavaScript', 'BootStrap', 'Github Pages'],
                references     :    [
                                        {link: 'https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/', title: 'Setting up your GitHub Pages site locally with Jekyll '},
                                        {link: 'http://jmcglone.com/guides/github-pages/'                                               , title: 'Creating and Hosting a Personal Site on GitHub'},
                                        {link: 'https://www.sylvaindurand.org/making-jekyll-multilingual/'                              , title: 'Making Jekyll multilingual '}
                                    ],
            }
        ];

        this._routerSub = router.events.subscribe((val) => 
        {
          if(val instanceof NavigationEnd) 
          {
              this.setiFrame(val.url);
              this.reInitialize(val.url);
              this.selectedFB = this.hS.projselectedFB;
          }
        });
    }

    ngOnInit(): void 
    {

    }

    public reInitialize(url: string) : void
    {
        url = url.split("/")[2];
        this.currentURL = url;
    }

    public checkCurrentURL(obj : Projects) : boolean
    {
        return (obj.link == this.currentURL) ? true : false;
    }

    setiFrame(url : string) : void
    {
        url = url.split("/")[2];
        for(let obj of this.arrProjects)
        {
            if(obj.link == url)
            {
                let isValid = (obj.link == url) ? true : false;

                if(isValid)
                {
                    this.gitSrc = obj.demo?.git;
                    this.iframeSrc = obj.demo?.video;
                }
            }
        }
        
    }

    checkFilter(obj : Projects) : boolean
    {
        return ((this.selectedFB == 'All') || (obj.type.includes(this.selectedFB))) ? true : false;
    }

    setFilter(str : string) : void
    {
        this.hS.projselectedFB = str;
        this.selectedFB = str;
    }

    ngOnDestroy()
    {
      if(!!this._routerSub)
      {
        this._routerSub.unsubscribe();
      }
    }

}
