import { utf8Encode } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

enum DigitOp {
  NOT,
  NEG,
  POS
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})

export class CalculatorComponent implements OnInit
{
  @ViewChild('calculatorForm') calculatorForm!: NgForm;
  public ByteSizes: {desc: string, bits: number}[] = 
  [
    {desc: '4 Bits', bits: 4},
    {desc: '1 Byte', bits: 8},
    {desc: '2 Bytes', bits: 16},
    {desc: '4 Bytes', bits: 32},
    {desc: '8 Bytes', bits: 64},
  ];
  public selectedSz: number = 32;

  public signedUnsigned: {desc: string, val: boolean}[] = 
  [
    {desc: 'Signed', val: true},
    {desc: 'Unsigned', val: false}
  ];
  public isSigned: boolean = false;

  public errMsg: string = "";
  
  public inputDecimal: string = "";
  public inputBinary: string = "";
  public inputHex:    string = "";

  public DEC_TO_HEX: any = 
  {
    0  : "0",
    1  : "1",
    2  : "2",
    3  : "3",
    4  : "4",
    5  : "5",
    6  : "6",
    7  : "7",
    8  : "8",
    9  : "9",
    10 : "A",
    11 : "B",
    12 : "C",
    13 : "D",
    14 : "E",
    15 : "F",
    16 : "10",
    17 : "11",
    18 : "12",
    19 : "13",
    20 : "14",
    21 : "15",
    22 : "16",
    23 : "17",
    24 : "18",
    25 : "19",
    26 : "1A",
    27 : "1B",
    28 : "1C",
    29 : "1D",
    30 : "1E",
    40 : "28",
    50 : "32",
    60 : "3C",
    70 : "46",
    80 : "50",
    90 : "5A",
    100 : "64",
    200 : "C8",
    1000 : "3E8",
    2000 : "7D0",
  };

  public HEX_TO_DEC: any = 
  {
    '0' : 0,
    '1' : 1,
    '2' : 2,
    '3' : 3,
    '4' : 4,
    '5' : 5,
    '6' : 6,
    '7' : 7,
    '8' : 8,
    '9' : 9,
    'A' : 10,
    'B' : 11,
    'C' : 12,
    'D' : 13,
    'E' : 14,
    'F' : 15,
    '10' : 16,
    '11' : 17,
    '12' : 18,
    '13' : 19,
    '14' : 20,
    '15' : 21,
    '16' : 22,
    '17' : 23,
    '18' : 24,
    '19' : 25,
    '1A' : 26,
    '1B' : 27,
    '1C' : 28,
    '1D' : 29,
    '1E' : 30,
    '28' : 40,
    '32' : 50,
    '3C' : 60,
    '46' : 70,
    '50' : 80,
    '5A' : 90,
    '64' : 100,
    'C8' : 200,
    '3E8' : 1000,
    '7D0' : 2000,
  };

  constructor()
  {
    // const importObject = { imports: { imported_func: (arg : any) => console.log(arg) } };

    // WebAssembly.instantiateStreaming(fetch('./assets/wasm/binCalculator.wasm'), importObject)
    // .then((obj: any) =>
    // {
    //   this.compiledStuff = obj.instance.exports;
    // });

    //console.log(this.compiledStuff.unsigned2Binary(e));
  }

  ngOnInit(): void
  {

  }

  public processRadio() : void
  {
    this.processDecimal(this.inputDecimal);
  }

  public processDecimal(e: string) : void
  {
    if(e == '')
    {
      this.inputDecimal = this.inputBinary = this.inputHex = '';
      return;
    }
    // Bin
    this.outputBinFromDec(e);
    // Hex
    this.outputHexFromDec(e);
  }

  public processBinary(e: string) : void
  {
    if(e == '')
    {
      this.inputDecimal = this.inputBinary = this.inputHex = '';
      return;
    }

    // Decimal
    this.outputDecFromBin(e);
    // Hex
    this.outputHexFromDec(this.inputDecimal);
  }

  public processHex(e : string) : void
  {
    if(e == '')
    {
      this.inputDecimal = this.inputBinary = this.inputHex = '';
      return;
    }

    // Decimal
    this.outputDecFromHex(e);
    
    // Binary
    this.outputBinFromDec(this.inputDecimal);
  }

  private outputBinFromDec(e: string) : void
  {
    let op, count, n, r, bit, min, max, isNeg;
    let str: string = "";
    this.errMsg = "";
    op = DigitOp.POS;
    
    if(e[0] == '~')
    {
      e = e.slice(1, e.length);
      op = DigitOp.NOT;
    }
    
    n = parseInt(e);

    if(this.isSigned)
    {
      min = -1 * Math.pow(2, this.selectedSz - 1);
      max = Math.pow(2, this.selectedSz - 1) - 1;
    }
    else
    {
      min = 0;
      max = Math.pow(2, this.selectedSz) - 1;
    }

    if(n > max)
    {
      this.errMsg = "Data Overflow";
      return;
    }
    else if(n < min)
    {
      this.errMsg = "Data Underflow";
      return;
    }
    
    count = 0;
    while(count < this.selectedSz)
    {
      bit = (n & 1);
      
      if(op == DigitOp.NOT)
      {
        bit = (bit == 1) ? 0 : 1;
      }

      str += bit;
      n = n >> 1;

      count++;
    }

    this.inputBinary = str.split("").reverse().join("");
  }

  private outputHexFromDec(e: string) : void
  {
    let op, count, n, r, bit, min, max, isNeg;
    let str: string = "";

    if(e[0] == '~')
    {
      e = e.slice(1, e.length);
      op = DigitOp.NOT;
    }
    
    n = parseInt(e);
    isNeg = (n < 0) ? -1 : 1;
    n = Math.abs(n);
    str = "";

    if(this.DEC_TO_HEX[n])
    {
      str += this.DEC_TO_HEX[n];
      
      if(isNeg < 0)
      {
        str += '-';
      }

      this.inputHex = str.split("").reverse().join("");
      return;
    }
    else
    {
      while(n > 0)
      {
        r = n % 16;
        n = Math.floor(n / 16);
        str += this.DEC_TO_HEX[r];
      }

      if(isNeg < 0)
      {
        str += '-';
      }
  
      this.inputHex = str.split("").reverse().join("");
    }
  }

  private outputDecFromBin(e : string) : void
  {
    this.errMsg = "";

    if(e.length > this.selectedSz)
    {
      this.errMsg = "Data Overflow";
      return;
    }

    let i, c, sum, sb, min;

    c = min = sum = 0;

    if(this.isSigned && (e.length == this.selectedSz) && (e[0] == '1'))
    {
      sum += -1 * Math.pow(2, this.selectedSz- 1);
      min = 1;
    }

    for(i = e.length - 1; i >= min; i--)
    {
      if(e[i] == '1')
      {
        sum += Math.pow(2, c);
      }
      c++;
    }

    this.inputDecimal = (sum) + '';
  }

  private outputDecFromHex(e : string) : void
  {
    let i, c, sum;

    sum = c = 0;
    e = e.toUpperCase();

    if(this.HEX_TO_DEC[e] != null)
    {
      this.inputDecimal = this.HEX_TO_DEC[e];
      return;
    }

    for(i = e.length - 1; i >= 0; i--)
    {
      if(this.HEX_TO_DEC[e[i]] != null)
      {
        sum += this.HEX_TO_DEC[e[i]] * Math.pow(16, c);
      }
      c++;
    }

    this.inputDecimal = sum + '';
  }
}
