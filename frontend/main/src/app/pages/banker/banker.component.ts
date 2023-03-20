import { Component } from '@angular/core';
import { SetdatarrService } from 'src/app/service/setdataarr.service';

@Component({
  selector: 'app-banker',
  templateUrl: './banker.component.html',
  styleUrls: ['./banker.component.css'],
})
export class BankerComponent {
  constructor(private setdata: SetdatarrService) {}
  table: any = [];
  max: any = [];
  alloc: any = [];
  avail: any = [];
  size: any = 0;
  finalans: any = [];
  string: any;
  addRow(max: any, alloc: any, avail: any): void {
    var maxx = max.split(',');
    max = maxx;
    var allocc = alloc.split(',');
    alloc = allocc;
    var availl = avail.split(',');
    avail = availl;
    let a = this.table.length;
    let b = 'P' + a;
    while (this.table.findIndex((nam: { name: any }) => nam.name === b) != -1) {
      a++;
      b = 'P' + a;
    }
    this.table.push({
      name: b,
      avaA: avail[0],
      avaB: avail[1],
      avaC: avail[2],
      maxA: max[0],
      maxB: max[1],
      maxC: max[2],
      allocA: alloc[0],
      allocB: alloc[1],
      allocC: alloc[2],
    });
  }
  removeRow(): void {
    console.log('sdadasd');
    this.table.splice(this.table.length - 1, 1);
  }
  submitValue(): void {
    let alock: any = [];
    // take values of alloc

    for (let i = 0; i < this.table.length; i++) {
      let temp23: any = [];

      temp23.push(this.table[i].allocA);
      temp23.push(this.table[i].allocB);
      temp23.push(this.table[i].allocC);
      alock.push(temp23);
    }
    let max = [];

    // take values of max.
    for (let i = 0; i < this.table.length; i++) {
      let temp45 = [];

      temp45.push(this.table[i].maxA);
      temp45.push(this.table[i].maxB);
      temp45.push(this.table[i].maxC);
      max.push(temp45);
    }

    let n: any = this.table.length;
    const m = 3;
    let f = [];
    for (let i: any = 0; i < n; i++) f[i] = 0;
    let ans = [];
    for (let i: any = 0; i < n; i++) ans[i] = -1;
    let ind = 0;

    // fill the need array.
    let need: any = [];
    for (let i = 0; i < n; i++) {
      need[i] = [];
      for (let j = 0; j < m; j++) {
        need[i][j] = max[i][j] - alock[i][j];
      }
    }

    // fill the avail array
    let avail = [this.table.avaA, this.table.avaB, this.table.avaC];
    let flag = true;
    var sumallocA = 0;
    var sumallocB = 0;
    var sumallocC = 0;
    console.log(this.table[0].allocA);
    for (let i = 0; i < this.table.length; i++) {
      sumallocA = sumallocA + parseInt(this.table[i].allocA);
      sumallocB = sumallocB +parseInt(this.table[i].allocB);
      sumallocC = sumallocC+ parseInt(this.table[i].allocC); 
    }
    sumallocA = parseInt(this.table.avaA) + sumallocA;
    sumallocB = parseInt(this.table.avaB) + sumallocB;
    sumallocC = parseInt(this.table.avaC) + sumallocC;
    console.log(sumallocA);
    console.log(sumallocB);
    console.log(sumallocC);
    
    let maxA = [];
    let maxB = [];
    let maxC = [];
    for (let index = 0; index < max.length; index++) {
      maxA.push(max[index][0]);
      maxB.push(max[index][1]);
      maxC.push(max[index][2]);
    }
    console.log(maxA);
    console.log(maxB);
    console.log(maxC);
    const maxofmaxA = Math.max.apply(null, maxA);
    const maxofmaxB = Math.max.apply(null, maxB);
    const maxofmaxC = Math.max.apply(null, maxC);


    if (
      sumallocA > maxofmaxA ||
      sumallocB > maxofmaxB ||
      sumallocC > maxofmaxC
    ) {
      flag = false;
      this.finalans = 'deadlock';
      return;
    }
    let y = 0;
    if (flag == true) {
      for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
          if (f[i] == 0) {
            let flag = false;
            for (let j = 0; j < m; j++) {
              if (need[i][j] > avail[j]) {
                flag = true;

                break;
              }
            }

            if (flag == false) {
              ans[ind++] = i;
              for (y = 0; y < m; y++) avail[y] += alock[i][y];
              f[i] = 1;
            }
          }
        }
      }
      for (let index = 0; index < ans.length; index++) {
        if (ans[index] < 0) {
          this.finalans = [];
          this.finalans.push('deadLock');
          return;
        } else {
          let b = 'P' + ans[index];
          this.finalans.push(b);
        }
      }
    }
    // function addElement(parentId, elementTag) {
    // 	// Adds an element to the document
    // 	var p = document.createElement(parentId);
    // 	var newElement = document.createTextNode(elementTag);
    // 	//newElement.setAttribute('id', elementId);
    // 	//newElement.innerHTML = html;
    // 	p.appendChild(newElement);
    // 	document.body.appendChild(p);
    // }

    // for (i = 0; i < n; i++) console.log(ans[i]);
    // var mastList = [];
    // var mastString = "";

    this.string = this.finalans.join(' ');
    this.setdata.savebanker(this.table).subscribe((data) => {
      console.log(data);
    });
  }
}
