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
  tf:any;   //total frames
  tp:any;//total pages
  sp:any; //sequence of pages
  observation:any;
  tr:any;//total replacement
  nh:any; //no. of hits
  nf:any;//no. of frames
  hr:any;//hit ratio
  fr:any;//fault ratio
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
    //maintainng the arrays for "hit" and "Replace columnns"
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
        //maintainnig an array for table

    let mentian = [];
    for (var i = 0; i < n; i++) {
      let temp3=[];
            //will get the index of current pages int the inst array

      var idx = inst.indexOf(this.pages[i]);
      //will go in if , if there is a miss
      if (idx == -1) {
          //will go in if , if there is a empty space for a page

          if (inst.length < frames) {
              // inst.push(pages[i]);
              inst.unshift(this.pages[i]);
          }
               //will go in else , if a page replacement is required

          else {             
              v[i] = inst[0];
              inst.splice(0,1);
              inst.unshift(this.pages[i]);
          }
             //maintaining the number of miss 

          this.misscount++;
      }
      else {
                   //will swap the page and keep the MRU page at 0th index

          inst.splice(inst.indexOf(this.pages[i]), 1);
          inst.unshift(this.pages[i]);
                    //update the "hit" column 

          hit[i] = "Yes";
                    //maintaining the number of hits

          this.hitcount++;
      }
            //updating the temp array if the size of temp3 != frames

      for (let k = 0; k < frames; k++) {
        if (inst[k] == undefined) {
          temp3[k] = "-";
        }else{
          temp3[k] = inst[k];
        }
      }
            //pushing the temp3 array into the mantian array

      mentian.push(temp3);   
  }
    //After computing all the hits and misses, we are storing all the values into a table

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
}
