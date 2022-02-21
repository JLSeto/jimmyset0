import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HelperService } from '../helpers/services/helper.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit
{
  private VoiceDataFile: any = null;
  public voiceUrl: any = null as any;
  public buttons: string[] = ['a', 's', 'd', 'f', ' ', 'j', 'k', 'l', ';'];
  public isPlaying: boolean = false;
  points: number = 0;  
  cScale: number = 50;
  tScale: number = 12;
  oScale: number = 1.5;
  circRadius: number = window.innerWidth / this.cScale;
  ticks: number = window.innerWidth / this.tScale;
  offSet: number = this.ticks / this.oScale;
  private keyCodes: any = 
  {
    'a': 0,
    's': 1,
    'd': 2,
    'f': 3,
    ' ': 4,
    'j': 5,
    'k': 6,
    'l': 7,
    ';': 8,
  }

  public idx: number = 0;
  public beatMapTime: {c: string, s: number, x: number, y: number, t1: number, t2: number}[] =
  [
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": -0.660066,
        "t2": 0.939934
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": -0.2441920000000002,
        "t2": 1.355808
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 0.25527599999999984,
        "t2": 1.855276
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 1.8280369999999997,
        "t2": 3.428037
    },
    {
        "c": " ",
        "s": 0,
        "x": 442.3333333333333,
        "y": 0,
        "t1": 2.8076449999999995,
        "t2": 4.407645
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 4.5889240000000004,
        "t2": 6.188924
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 5.804755,
        "t2": 7.404755
    },
    {
        "c": ";",
        "s": 0,
        "x": 884.6666666666666,
        "y": 0,
        "t1": 7.1896889999999996,
        "t2": 8.789689
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 8.688664000000001,
        "t2": 10.288664
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 9.571926,
        "t2": 11.171926
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 11.456086,
        "t2": 13.056086
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 11.489399,
        "t2": 13.089399
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 11.489399,
        "t2": 13.089399
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 11.489399,
        "t2": 13.089399
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 12.858291,
        "t2": 14.458291
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 12.858291,
        "t2": 14.458291
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 12.858291,
        "t2": 14.458291
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 12.858291,
        "t2": 14.458291
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 14.322785,
        "t2": 15.922785
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 14.322785,
        "t2": 15.922785
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 14.322785,
        "t2": 15.922785
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 14.322785,
        "t2": 15.922785
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 15.054385000000002,
        "t2": 16.654385
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 15.054385000000002,
        "t2": 16.654385
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 15.054385000000002,
        "t2": 16.654385
    },
    {
        "c": ";",
        "s": 0,
        "x": 884.6666666666666,
        "y": 0,
        "t1": 15.054385000000002,
        "t2": 16.654385
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 17.12445,
        "t2": 18.72445
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 17.12445,
        "t2": 18.72445
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 17.12445,
        "t2": 18.72445
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 17.12445,
        "t2": 18.72445
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 18.355991999999997,
        "t2": 19.955992
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 20.005587,
        "t2": 21.605587
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 20.338714,
        "t2": 21.938714
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 20.672293,
        "t2": 22.272293
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 21.004793,
        "t2": 22.604793
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 22.405699,
        "t2": 24.005699
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 22.838196999999997,
        "t2": 24.438197
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 23.172483999999997,
        "t2": 24.772484
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 23.489341999999997,
        "t2": 25.089342
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 24.939082,
        "t2": 26.539082
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 25.689857,
        "t2": 27.289857
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 25.989645,
        "t2": 27.589645
    },
    {
        "c": ";",
        "s": 0,
        "x": 884.6666666666666,
        "y": 0,
        "t1": 26.356323999999997,
        "t2": 27.956324
    },
    {
        "c": " ",
        "s": 0,
        "x": 442.3333333333333,
        "y": 0,
        "t1": 28.422825999999997,
        "t2": 30.022826
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 29.772723,
        "t2": 31.372723
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 31.272999999999996,
        "t2": 32.873
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 31.272999999999996,
        "t2": 32.873
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 31.272999999999996,
        "t2": 32.873
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 31.272999999999996,
        "t2": 32.873
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 33.689766999999996,
        "t2": 35.289767
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 33.95616,
        "t2": 35.55616
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 34.206821999999995,
        "t2": 35.806822
    },
    {
        "c": ";",
        "s": 0,
        "x": 884.6666666666666,
        "y": 0,
        "t1": 34.555579,
        "t2": 36.155579
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 34.856255,
        "t2": 36.456255
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 35.193721,
        "t2": 36.793721
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 36.75551,
        "t2": 38.35551
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 37.721986,
        "t2": 39.321986
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 38.956987,
        "t2": 40.556987
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 40.689149,
        "t2": 42.289149
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 42.2067,
        "t2": 43.8067
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 42.589393,
        "t2": 44.189393
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 43.039151,
        "t2": 44.639151
    },
    {
        "c": " ",
        "s": 0,
        "x": 442.3333333333333,
        "y": 0,
        "t1": 43.90566,
        "t2": 45.50566
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 45.121959,
        "t2": 46.721959
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 45.521975999999995,
        "t2": 47.121976
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 45.855485,
        "t2": 47.455485
    },
    {
        "c": ";",
        "s": 0,
        "x": 884.6666666666666,
        "y": 0,
        "t1": 46.355679,
        "t2": 47.955679
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 48.105534,
        "t2": 49.705534
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 48.505711999999995,
        "t2": 50.105712
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 48.873184,
        "t2": 50.473184
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 49.391225999999996,
        "t2": 50.991226
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 49.656286,
        "t2": 51.256286
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 51.122825999999996,
        "t2": 52.722826
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 52.489391,
        "t2": 54.089391
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 52.822024,
        "t2": 54.422024
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 53.172098999999996,
        "t2": 54.772099
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 53.53948,
        "t2": 55.13948
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 55.391249,
        "t2": 56.991249
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 55.391249,
        "t2": 56.991249
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 55.391249,
        "t2": 56.991249
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 55.391249,
        "t2": 56.991249
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 56.588887,
        "t2": 58.188887
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 56.588887,
        "t2": 58.188887
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 56.588887,
        "t2": 58.188887
    },
    {
        "c": ";",
        "s": 0,
        "x": 884.6666666666666,
        "y": 0,
        "t1": 56.588887,
        "t2": 58.188887
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 58.273493,
        "t2": 59.873493
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 58.273493,
        "t2": 59.873493
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 59.490764,
        "t2": 61.090764
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 59.490764,
        "t2": 61.090764
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 60.273255,
        "t2": 61.873255
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 60.439375,
        "t2": 62.039375
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 60.624164,
        "t2": 62.224164
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 60.756217,
        "t2": 62.356217
    },
    {
        "c": ";",
        "s": 0,
        "x": 884.6666666666666,
        "y": 0,
        "t1": 61.756498,
        "t2": 63.356498
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 62.038776999999996,
        "t2": 63.638777
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 62.39254,
        "t2": 63.99254
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 62.672574000000004,
        "t2": 64.272574
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 63.023813999999994,
        "t2": 64.623814
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 63.372128999999994,
        "t2": 64.972129
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 63.840025000000004,
        "t2": 65.440025
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 64.189396,
        "t2": 65.789396
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 65.173536,
        "t2": 66.773536
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 65.173536,
        "t2": 66.773536
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 65.173536,
        "t2": 66.773536
    },
    {
        "c": ";",
        "s": 0,
        "x": 884.6666666666666,
        "y": 0,
        "t1": 65.188699,
        "t2": 66.788699
    },
    {
        "c": " ",
        "s": 0,
        "x": 442.3333333333333,
        "y": 0,
        "t1": 66.605866,
        "t2": 68.205866
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 67.856007,
        "t2": 69.456007
    },
    {
        "c": ";",
        "s": 0,
        "x": 884.6666666666666,
        "y": 0,
        "t1": 69.438834,
        "t2": 71.038834
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 70.774268,
        "t2": 72.374268
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 71.071887,
        "t2": 72.671887
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 71.42321700000001,
        "t2": 73.023217
    },
    {
        "c": ";",
        "s": 0,
        "x": 884.6666666666666,
        "y": 0,
        "t1": 71.739214,
        "t2": 73.339214
    },
    {
        "c": "a",
        "s": 0,
        "x": 0,
        "y": 0,
        "t1": 72.32215400000001,
        "t2": 73.922154
    },
    {
        "c": "s",
        "s": 0,
        "x": 110.58333333333333,
        "y": 0,
        "t1": 73.69051,
        "t2": 75.29051
    },
    {
        "c": "d",
        "s": 0,
        "x": 221.16666666666666,
        "y": 0,
        "t1": 74.639881,
        "t2": 76.239881
    },
    {
        "c": "f",
        "s": 0,
        "x": 331.75,
        "y": 0,
        "t1": 75.95575600000001,
        "t2": 77.555756
    },
    {
        "c": "j",
        "s": 0,
        "x": 552.9166666666666,
        "y": 0,
        "t1": 77.97282700000001,
        "t2": 79.572827
    },
    {
        "c": "k",
        "s": 0,
        "x": 663.5,
        "y": 0,
        "t1": 77.97282700000001,
        "t2": 79.572827
    },
    {
        "c": "l",
        "s": 0,
        "x": 774.0833333333333,
        "y": 0,
        "t1": 77.97282700000001,
        "t2": 79.572827
    },
    {
        "c": ";",
        "s": 0,
        "x": 884.6666666666666,
        "y": 0,
        "t1": 77.97282700000001,
        "t2": 79.572827
    }
]
  // [
  //   {c: 'a', s: 0, x: 0, y: 0, t1: 1, t2: 5},
  //   {c: 's', s: 0, x: 0, y: 0, t1: 1, t2: 5.5},
  //   {c: 'd', s: 0, x: 0, y: 0, t1: 1, t2: 7.5},
  //   {c: 'f', s: 0, x: 0, y: 0, t1: 1, t2: 9.5}
  // ]

  public beatMapGen: {c: string, s: number, x: number, y: number, t1: number, t2: number}[] = [];
  // [0.876512, 2.460252, 2.758479, 3.324489, 4.060937, 4.842486, 6.324823, 7.357825, 8.657185, 9.240917, 10.324573];
  // private keyCodes: any = 
  // {
  //   'q': 0,
  //   'a': 0,
  //   'z': 0,

  //   'w': 1,
  //   's': 1,
  //   'x': 1,

  //   'e': 2,
  //   'd': 2,
  //   'c': 2,
  
  //   'r': 3,
  //   'f': 3,
  //   'v': 3,

  //   't': 4,
  //   'g': 4,
  //   'b': 4,

  //   'y': 5,
  //   'h': 5,
  //   'n': 5,

  //   'u': 6,
  //   'j': 6,
  //   'm': 6,

  //   'i': 7,
  //   'k': 7,
  //   ',': 7,

  //   'o': 8,
  //   'l': 8,
  //   '.': 8,

  //   'p': 9,
  //   ';': 9,
  //   '/': 9,
  // }
  public pics: {img: any, keyCodes: string[], x: number, y: number, tHit: number, aHit: number, hit: boolean}[] = 
  [
    {img: null, keyCodes: ['a'], x: 0, y: 0, tHit: 0, aHit: 0, hit: false}, 
    {img: null, keyCodes: ['s'], x: 0, y: 0, tHit: 0, aHit: 0, hit: false}, 
    {img: null, keyCodes: ['d'], x: 0, y: 0, tHit: 0, aHit: 0, hit: false}, 
    {img: null, keyCodes: ['f'], x: 0, y: 0, tHit: 0, aHit: 0, hit: false}, 
    {img: null, keyCodes: [' '], x: 0, y: 0, tHit: 0, aHit: 0, hit: false}, 
    {img: null, keyCodes: ['j'], x: 0, y: 0, tHit: 0, aHit: 0, hit: false}, 
    {img: null, keyCodes: ['k'], x: 0, y: 0, tHit: 0, aHit: 0, hit: false}, 
    {img: null, keyCodes: ['l'], x: 0, y: 0, tHit: 0, aHit: 0, hit: false}, 
    {img: null, keyCodes: [';'], x: 0, y: 0, tHit: 0, aHit: 0, hit: false}
  ];
  public timeCount: string = '';

  public testImage = new Image();
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null as any;
  @ViewChildren(MatRipple) rippleList!: QueryList<MatRipple>;
  //Control the audio player
  @ViewChild('audio', { static: true }) audio!: ElementRef<HTMLAudioElement>;

  private x = 0;
  private y = 0;
  innerWidth: number = window.innerWidth;
  innerHeight: number = window.innerHeight;

  //Engine
  public lastTime: number = Date.now();

  //Window Request Fraom
  public windowRequest: any = null;

  tempFilled = 0;

  private growingRad: number = 1;

  constructor(private cd: ChangeDetectorRef, private dom: DomSanitizer, public hS: HelperService)
  {
    this.hS.showNav = false;
    for(let i = 0; i < this.pics.length; i++)
    {
      this.pics[i].x = i * this.ticks;
    }

    this.beatMapTime.forEach((val) => 
    {
      val.x = this.keyCodes[val.c] * this.ticks;
    });

    this.addEventListeners();
  }

    //Start Engine
    private main = () =>
    {
        let now = Date.now();
        let dt = (now - this.lastTime) / 1000.0;
        // this.update(dt);
        // this.render();
        
        //Static 
        // this.pics.forEach((val) => 
        // {
        //   this.ctx?.drawImage(val.img, val.x, this.canvas.nativeElement.height - 90);
        // });

        this.realGamePlay(dt, now);
        // this.realGamePlay(dt);

        this.lastTime = now;
        this.windowRequest = window.requestAnimationFrame(this.main);
    }

    private init = () =>
    {
        this.lastTime = Date.now();
        this.main();
    }


  @HostListener('window:resize', ['$event']) onResize(event: any) 
  {
    this.innerWidth = event.target.innerWidth;
    this.innerHeight = event.target.innerHeight;
    this.ticks = this.innerWidth / this.tScale;
    this.offSet = this.ticks / this.oScale;
    this.circRadius = this.innerWidth / this.cScale;

    for(let i = 0; i < this.pics.length; i++)
    {
      this.pics[i].x = i * this.ticks;
    }

    this.beatMapTime.forEach((val) => 
    {
      val.x = this.keyCodes[val.c] * this.ticks;
    });

    console.log(this.innerWidth, this.innerHeight)
    // this.checkifMobile();
    this.initializeCanvas();
  }

  ngOnDestroy() : void
  {
    this.hS.showNav = true;
  }

  ngOnInit(): void
  {
    this.audio.nativeElement.ontimeupdate = this.gamePlay();
    this.audio.nativeElement.onended = this.gameEnded();
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.initializeCanvas();
  
    this.init();
  }

  private initializeCanvas() : void
  {
      let h: any = document.getElementById('bg-game')?.clientHeight;
      this.canvas.nativeElement.height = ((!!h) ? h: this.innerHeight) * 0.80;
      this.canvas.nativeElement.width = this.innerWidth * 0.80;
      this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      // this.ctx?.strokeRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

      // this.ctx!.font = '48px Material Icons';
      // this.ctx!.fillStyle = "#00ff00";
      // this.ctx!.fillText('circle',100,100);
      // this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.pics.forEach((val, key) => 
      {
        // Static
        this.circ(val.x + this.offSet, this.canvas.nativeElement.height - 100, this.circRadius, 'pink', false, val.keyCodes[0]);
      });

  }

  public realGamePlay(dt: number, now: number)
  {
    let newPosOffset = (this.canvas.nativeElement.height - 100) / 100;
    this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    // this.ctx?.strokeRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    let currTime = this.audio.nativeElement.currentTime;

    this.pics.forEach((val, key) => 
    {
      if(val.hit == true || now - val.tHit < 0.12) // (val.tHit != 0)
      {

        // beat map generator
        // if(val.hit == true)
        // {
        //   let temp = {c: val.keyCodes[0], s: 0, x: val.x, y: 0, t1: this.audio.nativeElement.currentTime - 1.6, 
        //     t2: this.audio.nativeElement.currentTime};
        //   this.beatMapGen.push(temp);
        //   val.hit = false;
        // }

        // Draw Stuff
        this.circ(val.x + this.offSet, this.canvas.nativeElement.height - 100, this.circRadius, 'pink', true);
      }

      // Static
      this.circ(val.x + this.offSet, this.canvas.nativeElement.height - 100, this.circRadius, 'pink', false, val.keyCodes[0]);

    });

    // Play Game
    if(!this.audio.nativeElement.paused && this.idx < this.beatMapTime.length && currTime >= this.beatMapTime[this.idx].t1)
    {
      for(let i = this.idx; i < this.beatMapTime.length 
        && this.beatMapTime[i].t1 <= currTime; i++)
        {
          let val = this.beatMapTime[i];
          if(val.y > this.canvas.nativeElement.height)
          {
            this.idx = i + 1;
            continue;
          }

          if(val.s != 0) continue;

          this.circ(val.x + this.offSet, val.y, this.circRadius - 4, 'pink');
          
          if(this.pics[this.keyCodes[val.c]].hit == true)
          {
            // let score = Math.abs(cTime - this.pics[this.keyCodes[val.c]].aHit);
            let baseline = (this.canvas.nativeElement.height - 100);
            if((val.y) >= (baseline - newPosOffset*20) && (val.y) <= (baseline + newPosOffset*20))
            {
              val.s = this.checkCollisions(val.y, baseline, newPosOffset);
              this.printEmotes(val.s);
              // console.log(val.s)
            }

          }
          val.y += newPosOffset;
        }
    }
  }

  printEmotes(val: number)
  {
    this.points += val;
  }

  public checkCollisions(y_val: number, baseline: number, offset: number) : number
  {
    if(y_val >= baseline - offset * 1 
      && y_val <= baseline + offset * 1)
    {
        return 5;
    }
    else if(y_val >= baseline - offset * 5 
      && y_val <= baseline + offset * 5)
    {
      return 4;
    }
    if(y_val >= baseline - offset * 10 
      && y_val <= baseline + offset * 10)
    {
      return 3;
    }
    else if(y_val >= baseline - offset * 15 
      && y_val <= baseline + offset * 15)
    {
      return 2;
    }
    else
    {
      return 1;
    }
  }

  public gamePlay(): () => void
  {
    return (() => 
    {

    });
  }

  public gameEnded(): () => void
  { 
    return (() => 
    {
      console.log(this.beatMapGen);
    });
  }

  ngAfterViewChecked() 
  {

  }

  private addEventListeners() : void
  {
      
      document.addEventListener('keydown', (e) => 
      {
        if((e.key).charCodeAt(0) < 32 || (e.key).charCodeAt(0) > 122) e.preventDefault();
        
        this.handleInput(e.key);
        e.preventDefault();
      });

      window.addEventListener("keyup", (e) => 
      {
        this.handleOutput(e.key);
        e.preventDefault();
      }, false);
  }

  async createFile()
  {
    this.timeCount = 'Loading...';
    let response = await fetch('/assets/kda-short.mp3');
    let data = await response.blob();
    let metadata = {
      type: 'audio/mp3'
    };
    let file = new File([data], "test.mp3", metadata);
    // ... do something with the file or return it
    
    return file;
  }

  public stopGame()
  {
    if(this.timeCount != '') return;

    this.timeCount = 'Game Over';
    this.idx = 0;
    this.points = 0;
    this.audio.nativeElement.pause();
    this.audio.nativeElement.currentTime = 0;

    this.pics.forEach((val) =>
    {
      val.y = 0;
      val.tHit = 0;
      val.aHit = 0;
      val.hit = false;
    });

    this.beatMapTime.forEach((val) =>
    {
      val.s = 0;
      val.y = 0;
    });

    this.initializeCanvas();

    this.isPlaying = false;
  }
  async onFileChanged(event?: any) 
  {
    this.isPlaying = true;
    if(!this.VoiceDataFile) this.VoiceDataFile = await this.createFile();

    this.computeLength(this.VoiceDataFile).then ((data : any) => 
    {
     if(data.duration > 3600) // No more than 1 hour
     {
       return;
     }
     else
     {
      this.voiceUrl = this.dom.bypassSecurityTrustUrl(URL.createObjectURL(this.VoiceDataFile));
     }
    })
    .then(() =>
    {
      this.cd.detectChanges();
      let count = 3;

      let x = setInterval(() => {
        this.timeCount = count + '';
        if(count == 0)
        {
          this.idx = 0;
          this.points = 0;
          this.timeCount = '';
          clearInterval(x);
          this.audio.nativeElement.play();
        }
        count--;
      }, 1000);
    });
  }

  computeLength(file: any) 
  {
   return new Promise((resolve) => 
   {
     var objectURL = URL.createObjectURL(file);
     var mySound = new Audio(objectURL);
     mySound.addEventListener( "canplaythrough", () => 
     {
       URL.revokeObjectURL(objectURL);
       resolve({duration: mySound.duration});
     });
   });  
  }


  public staticCircles()
  {

  }

  public circ(x: number, y: number, rad: number, c: string, f?: boolean, l?: string)
  {
    this.ctx!.fillStyle = c;
    this.ctx!.strokeStyle = c;
    this.ctx!.lineWidth = 5;
    this.ctx?.beginPath();
    this.ctx?.arc(x, y, rad, 0, 2* Math.PI, false);
    this.ctx?.closePath();
    
    if(!!l)
    {
      this.ctx!.font = Math.floor(rad / 1.5) + 'pt Calibri';
      this.ctx!.fillStyle = '#FF4048';
      this.ctx!.textAlign = 'center';

      if(l == ' ') l = "'  '";

      this.ctx?.fillText(l, x, y + 3);
    }

    if(f)
    {
      this.ctx?.fill();
    }
    else
    {
      this.ctx?.stroke();
    }
  }



  public draw()
  {
    if(this.growingRad > 100) this.growingRad = 1;

    this.circ(this.pics[0].x  + this.ticks + 56 / 2.3, this.canvas.nativeElement.height - 100 + 56 / 1.7,
      this.growingRad, 'pink');

      this.growingRad = this.growingRad + 3;
  }

  public handleInput = (keys : string) : void => 
  {
      let y = this.keyCodes[keys.toLocaleLowerCase()]
      if(y == null || y < 0 || this.pics[y].hit) return;
      this.pics[y].tHit = (Date.now() / 1000.0);
      this.pics[y].aHit = this.audio.nativeElement.currentTime;
      this.pics[y].hit = true;
  }

  public handleOutput = (keys : string) : void => 
  {
      let y = this.keyCodes[keys.toLocaleLowerCase()]
      if(y == null || y < 0)
      {
        console.log(this.beatMapGen);
        return;
      }

      this.pics[y].hit = false;
  }

  getUrl()
  {
    return "/assets/kda_pic.jpg";
  }

}