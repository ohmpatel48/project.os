import { Component } from '@angular/core';
import { SetdatarrService } from 'src/app/service/setdataarr.service';

@Component({
  selector: 'app-rrsimul',
  templateUrl: './rrsimul.component.html',
  styleUrls: ['./rrsimul.component.css'],
})
export class RrsimulComponent {
  constructor(private setdata : SetdatarrService) { 
    console.log(this.aot);
    console.log(this.bot);
  }

  aot: any = '';
  bot: any = '';
  timquant: any = '';

  table: any = [];

  del(obj: any): void {
    let index = this.table.findIndex((nam: { name: any }) => nam.name === obj);
    console.log('del: ' + index);

    this.table.splice(index, 1);
  }

  add(aot: any, bot: any): void {
    this.aot = aot;
    this.bot = bot;
    let a = this.table.length;
    console.log(a);
    let b = 'P' + a;
    while (this.table.findIndex((nam: { name: any }) => nam.name === b) != -1) {
      a++;
      b = 'P' + a;
    }
    this.table.push({ name: b, arrival: this.aot, burst: this.bot });
    console.log(this.table);
   }

   start(timeq: any): void {
    
    
      this.setdata.saverr(this.table).subscribe(
        (data) => {
        console.log(data);
        },
        (error) => console.log(error)
      );
   }
   reset(): void {

   }

  // processArr: any = [];
  // g: any = [];
  // tm: any = [];
  // pid: any = [];
  // data = {
  //   header: ['processId', 'TAT'],
  //   rows: [],
  // };
  // start(timeq: any): void {
  //   this.timquant = timeq;
  //   console.log(this.timquant);
  //   if (this.timquant == '') {
  //     alert('Please enter time quantum');
  //   } else {
  //     let times = ['st', 'ct', 'rt', 'wt', 'tat'];
  //     let rowLength = this.table.length;
  //     for (let i = 0; i < rowLength; i++) {
  //       this.processArr.push({
  //         at: parseInt(this.table[i].arrival, 10),
  //         bt: parseInt(this.table[i].burst, 10),
  //         rbt: parseInt(this.table[i].burst, 10),
  //         pid: this.table[i].name,
  //       });
  //     }
  //     this.processArr = this.calculateAllTimes(this.processArr, this.timquant);
  //     let avgTAT = 0,avgWT = 0,avgRT = 0;
  //     for (let i = 0; i < this.processArr.length; i++) {
  //       avgTAT += this.processArr[i].tat;
  //       avgWT += this.processArr[i].wt;
  //       avgRT += this.processArr[i].rt;
  //     }
  //     this.processArr.sort(function (a: { st: any; }, b: { st: any; }) {
  //       var keyA = a.st,
  //         keyB = b.st;
  //       // Compare the 2 dates
  //       if (keyA < keyB) return -1;
  //       if (keyA > keyB) return 1;
  //       return 0;
  //     });
  //   }
  // }
  // reset(): void {}

  // calculateAllTimes(arr: any, timquant: any) {
  //     let time = Infinity;
  //     for (let i = 0; i < arr.length; i++) {
  //       if (arr[i].arrival < time) {
  //         time = arr[i].arrival;
  //       }
  //     }
  
  //     while (arr.find((el: { finish: any }) => el.finish == undefined)) {
  //       let sortedArr = [...arr];
  //       sortedArr.sort((a, b) => a.at - b.at);
  
  //       let pArr = [];
  //       for (let i = 0; i < sortedArr.length; i++) {
  //         if (sortedArr[i].at <= time && sortedArr[i].finish != true) {
  //           pArr.push(sortedArr[i]);
  //         }
  //       }
  //       if (pArr.length == 0) {
  //         time++;
  //         continue;
  //       }
  //       for (let i = 0; i < pArr.length; i++) {
  //         if (pArr[i].st == undefined) {
  //           pArr[i].st = time;
  //           pArr[i].rt = pArr[i].st - pArr[i].at;
  //         }
  //         time = time + Math.min(timquant, pArr[i].rbt);
  //         pArr[i].rbt = pArr[i].rbt - Math.min(timquant, pArr[i].rbt);
  //         this.g.push(pArr[i].pid);
  //         this.tm.push(time);
  //         if (pArr[i].rbt == 0) {
  //           pArr[i].ct = time;
  //           pArr[i].tat = pArr[i].ct - pArr[i].at;
  //           pArr[i].wt = pArr[i].tat - pArr[i].bt;
  //           pArr[i].finish = true;
  //         }
  
  //         for (let j = i + 1; j < sortedArr.length; j++) {
  //           if (
  //             sortedArr[j].at <= time &&
  //             sortedArr[j].finish != true &&
  //             !pArr.includes(sortedArr[j])
  //           ) {
  //             pArr.push(sortedArr[j]);
  //           }
  //         }
  //         if (pArr[i].rbt != 0) {
  //           pArr.push(pArr[i]);
  //         }
  //       }
  //     }
  //     return arr;
  //   }
  
  }

  
  
  



