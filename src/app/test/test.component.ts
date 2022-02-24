import { Component, OnInit } from '@angular/core';

declare const google:  any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})


export class TestComponent implements OnInit 
{
  private SIZE: number = 10230 / 10; // seconds
  public post: {_id: string, selections: any[]} = {_id: 'fff',selections: new Array(this.SIZE) }; // (new Array(10).fill( (new Array(3)).fill(0) ) )

  public SV: any = {
    1: [2,6],
    2: [3,7],
    3: [4,8],
    4: [5,9],
    5: [1,9],
    6: [2,10],
    7: [1,8],
    8: [2,9],
    9: [3,10],
   10: [2,3],
   11: [3,4],
   12: [5,6],
   13: [6,7],
   14: [7,8],
   15: [8,9],
   16: [9,10],
   17: [1,4],
   18: [2,5],
   19: [3,6],
   20: [4,7],
   21: [5,8],
   22: [6,9],
   23: [1,3],
   24: [4,6],
   25: [5,7],
   26: [6,8],
   27: [7,9],
   28: [8,10],
   29: [1,6],
   30: [2,7],
   31: [3,8],
   32: [4,9],
 }


  constructor()
  {
    let val = 1;
    let prn_seq = new Array(16);

    for(let i = 0; i < this.SIZE; i++)
    {
      this.post.selections[i] = (new Array(4).fill(0));
    }

    for(let i = 0; i < 16; i++)
    {
      prn_seq[i] = this.getRandomInt(-1 , 1);
    }

    let f = 154 * 10.23e6; // 77 * 10.23e6;
    let tick = 2.0e-8/1000; // 5e-9 / 1000;
    let idx = 0;

    // let f = 1.023e6;
    // let tick = 1.023e-7; // 5e-9 / 1000;
    // let idx = 0;


    let ca = this.prnCreator(1);

    for(let i = 0; i < this.SIZE; i++)
    {
  
      this.post.selections[i][0] = idx;
      this.post.selections[i][2] = Math.sin(2 * Math.PI * f * idx);
      this.post.selections[i][1] = prn_seq[Math.floor(idx * f) % 16];

      // PRN Code
    //   this.post.selections[i][1] = ca[Math.floor(idx * f) % 1023];

      this.post.selections[i][3] = this.post.selections[i][2] * this.post.selections[i][1]; 
      idx = idx + tick;
    }

    
    // for(let i = 0; i < 2 *Math.PI; i++)
    // {
    //   this.post.selections.push({content: i, rank: Math.sin(i)});
    // }
    
    // for(let i = 1; i < 2 * Math.PI; i++)
    // {
    //   this.post.selections.push({content: i, rank: val, extra: Math.sin(i)});
    //   this.post.selections.push({content: i + 0.5, rank: val, extra: Math.sin(i + 0.5)});
    //   this.post.selections.push({content: i + 0.999999, rank: val, extra: Math.sin(i + 0.999999)});
    //   val = (val == 1) ? 0 : 1;
    // }
  }

  ngOnInit(): void 
  {

  }

  public prnCreator(prn : number) : number[]
  {
    let g1, g2;
    let G1 = new Array(10).fill(1);
    let G2 = new Array(10).fill(1);
    let ca = [];

    for(let i = 0; i < 1023; i++)
    {
      g1 = this.shift(G1, [3, 10], [10]);
      g2 = this.shift(G2, [2, 3, 6, 8, 9, 10], this.SV[prn]);
      ca.push((g1 + g2) % 2);
    }

    return ca;
  }

  private shift(register: number[], feedback: number[], output: number[]) : number
  {
    let out = [], fb = [];
    let outVal, fbVal;
    for(let i = 0; i < output.length; i++)
    {
      out.push(register[output[i] - 1]);
    }

    if(out.length > 1)
    {
      outVal = out.reduce((prev: number, curr: number) => prev + curr, 0) % 2;
    }
    else
    {
      outVal = out[0];
    }

    // feedback
    for(let i = 0; i < feedback.length; i++)
    {
      fb.push(register[feedback[i] - 1]);
    }

    fbVal = fb.reduce((prev: number, curr: number) => prev + curr, 0) % 2;

    for(let i = register.length - 2; i >= 0; i--)
    {
      register[i + 1] = register[i];
    }

    register[0] = fbVal;

    return outVal;

  }

  public getRandomInt(min: number, max: number) : number
  {
    min = Math.ceil(min);
    max = Math.floor(max);

    let ret = Math.floor(Math.random() * (max - min + 1)) + min;


    while(ret == 0)
    {
      ret = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    return ret;
  }

}
