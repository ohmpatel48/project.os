import { Component } from '@angular/core';
import { SetdatarrService } from "src/app/service/setdataarr.service";

@Component({
  selector: 'app-mru',
  templateUrl: './mru.component.html',
  styleUrls: ['./mru.component.css']
})
export class MruComponent {
  
  constructor(private setdata : SetdatarrService) { }
  
  tableData:any = [];
  frames:any;
  pages: any=[];
  summary:any;
  output:any;
  tf:any;
  tp:any;
  sp:any;
  observation:any;
  tr:any;
  nh:any;
  nf:any;
  hr:any;
  fr:any;
  savedata:any;
  keys:any = [];
  values:any = [];
  hitcount = 0;
  misscount = 0;
  getData(){
    
    this.tableData.forEach((element:any) => {
      this.values.push(Object.values(element));
      this.keys= Object.keys(element);
    });
  }
  submit(frames:any,istring:any){
    this.frames= frames;
    this.pages = istring.split(" ");
    let count = 0;
    let n =this.pages.length;
    this.savedata = {frames:frames,array:this.pages};  
    this.setdata.savemru(this.savedata).subscribe((data)=>{console.log(data)},(error)=>console.log(error));
    let hit =[];
    let inst =[];
    let v =[];
    for (let index = 0; index < this.pages.length; index++) {
      hit[index] = "No";  
      v[index] = "-";
      // for (let j = 0; j < frames; j++) {
      //     inst[index][j]="-";   
      // }
    }
    let mentian = [];
    for (var i = 0; i < n; i++) {
      let temp3=[];
      var idx = inst.indexOf(this.pages[i]);
      if (idx == -1) {
          if (inst.length < frames) {
              // inst.push(pages[i]);
              inst.unshift(this.pages[i]);
          }
          else {             
              v[i] = inst[0];
              inst.splice(0,1);
              inst.unshift(this.pages[i]);
          }
          this.misscount++;
      }
      else {
         
          inst.splice(inst.indexOf(this.pages[i]), 1);
          inst.unshift(this.pages[i]);
          hit[i] = "Yes";
          this.hitcount++;
      }
      for (let k = 0; k < frames; k++) {
        if (inst[k] == undefined) {
          temp3[k] = "-";
        }else{
          temp3[k] = inst[k];
        }
      }
      
      mentian.push(temp3);   
  }
  for (let index = 0; index < this.pages.length; index++) {
    let temp:any = {};
    let tempstring = "P"+ count;
    count++;
    temp[`Name`] = tempstring;
    temp[`Page`] = this.pages[index];
    for (let i = 0; i < frames; i++) {
      temp[`Frame${i+1}`] = mentian[index][i];
    }
    temp[`Hit`] = hit[index]; 
    temp[`Replaced`] = v[index]; 
    this.tableData.push(temp);
  }
  this.getData();
  this.summary="Summary:-";
  this.output = "Output";
  this.tf = "Total Frames"+": "+this.frames;
  this.tp = "Total Pages"+": "+this.pages.length;
  this.sp = "Total Page Faults"+": "+this.pages;
  this.observation = "Observation:-";
  this.tr = "Total Reference"+": "+this.pages.length;
  this.nh = "Number of Hits"+": "+this.hitcount;
  this.nf = "Number of Faults"+": "+this.misscount;
  this.hr = "Hit Ratio"+": "+(this.hitcount/this.pages.length)*100+"%";
  this.fr = "Fault Ratio"+": "+(this.misscount/this.pages.length)*100+"%";


  }
  getCellColor(value: string): string {
    if ("No" == value) {
      return 'red';
    } else if ("Yes" == value) {
      return 'green';
    } else {
      return 'none';
    }
  }
  

}
