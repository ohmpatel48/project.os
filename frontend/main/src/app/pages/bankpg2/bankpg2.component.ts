import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SetdatarrService } from 'src/app/service/setdataarr.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-banker',
  templateUrl: './bankpg2.component.html',
  styleUrls: ['./bankpg2.component.css'],
})
export class Bankpg2Component {
  constructor(private setdata: SetdatarrService) { }
  table: any = []; //declaration of variables
  max: any = [];
  alloc: any = [];
  avail: any = [];
  size: any = 0;
  finalans: any = [];
  string: any;
  flow: any = [];
  hidebutton: any = true;
  addRow(max: any, alloc: any, avail: any): void {   //to add row in table
    document.getElementById('A1')!.style.display = 'none';
    var maxx = max.split(',');  //max field value store and seprated by ,
    max = maxx;
    var allocc = alloc.split(','); //allocation
    alloc = allocc;
    var availl = avail.split(','); //available
    avail = availl;
    let a = this.table.length;
    let b = 'P' + a;  // process No.
    while (this.table.findIndex((nam: { name: any }) => nam.name === b) != -1) {
      a++;
      b = 'P' + a;
    }

    if (max.length > 3 || avail.length > 3 || alloc.length > 3) {  // Validation of Input and give error
      alert('Enter appropriate values.');
      window.location.reload();
      return;
    }
    else {
      for (let index = 0; index < 3; index++) {   //validation
        if (Number.isNaN(parseInt(max[index])) || Number.isNaN(parseInt(alloc[index])) || Number.isNaN(parseInt(avail[index]))) {
          alert('Enter appropriate values.');
          window.location.reload();
          return;
        }
      }
      for (let index = 0; index < 3; index++) {  //validation
        if (!(Number.isInteger(parseInt(max[index])) || Number.isInteger(parseInt(alloc[index])) || Number.isInteger(parseInt(avail[index])))) {
          alert('Enter appropriate values.');
          window.location.reload();
          return;
        }
      }

    }

    this.table.push({ //push value in table
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
    console.log(this.table);
  }

  removeRow(): void {   //remove row from table
    this.table.splice(this.table.length - 1, 1);
    if (this.table.length == 0) {
      document.getElementById('A1')!.style.display = 'flex';
    }
  }
  submitValue(): void {   // Main Logic

    if (this.table.length < 1) {  // validation
      alert('Enter appropriate values.');
      window.location.reload();
      return;
    }

    this.hidebutton = false;
    this.setdata.savebanker(this.table).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
    this.flow.push(1);
    const top = document.getElementById('top');

    top?.addEventListener('click', function handleClick(event) {
      top.style.display = 'none';
    });
    document.getElementById('printProcess')!.style.display = 'block';  // hide textfield on click event
    document.getElementById('download')!.style.display = 'block';

    let allocatedA = [];  //calculating Need metrix , Available ,Allocation , Max
    let allocatedB = [];
    let allocatedC = [];
    let maximumA = [];
    let maximumB = [];
    let maximumC = [];
    let availableResorces = [];
    let n = this.table.length;

    for (let i = 0; i < this.table.length; i++) {
      allocatedA.push(parseInt(this.table[i].allocA));  //storing value from textfield
      allocatedB.push(parseInt(this.table[i].allocB));
      allocatedC.push(parseInt(this.table[i].allocC));
      maximumA.push(parseInt(this.table[i].maxA));
      maximumB.push(parseInt(this.table[i].maxB));
      maximumC.push(parseInt(this.table[i].maxC));
    }

    let allocatedALL = new Array(n);
    let maximumALL = new Array(n);

    for (let i = 0; i < n; i++) {
      allocatedALL[i] = new Array(3);
      maximumALL[i] = new Array(3);

      allocatedALL[i][0] = allocatedA[i];
      allocatedALL[i][1] = allocatedB[i];
      allocatedALL[i][2] = allocatedC[i];
      maximumALL[i][0] = maximumA[i];
      maximumALL[i][1] = maximumB[i];
      maximumALL[i][2] = maximumC[i];
    }

    availableResorces.push(parseInt(this.table[0].avaA)); //calculating available resources
    availableResorces.push(parseInt(this.table[0].avaB));
    availableResorces.push(parseInt(this.table[0].avaC));

    let deadlock = false;

    let sumA = 0;
    let sumB = 0;
    let sumC = 0;

    for (let i = 0; i < allocatedA.length; i++) {  // find work metrix as sum
      sumA = sumA + allocatedA[i];
      sumB = sumB + allocatedB[i];
      sumC = sumC + allocatedC[i];
    }

    sumA = sumA + availableResorces[0];
    sumB = sumB + availableResorces[1];
    sumC = sumC + availableResorces[2];

    if (
      sumA > Math.max.apply(null, maximumA) ||
      sumB > Math.max.apply(null, maximumB) ||
      sumC > Math.max.apply(null, maximumC)
    ) {
      deadlock = true;
    }

    // console.log(maximumALL[0][0])
    let need = new Array(n);  //calculating Need Matrix
    for (let i = 0; i < n; i++) {
      // let temp :any= [];
      need[i] = new Array(3);
      for (let j = 0; j < 3; j++) {
        need[i][j] = maximumALL[i][j] - allocatedALL[i][j];
      }
    }
    console.log(need);

    if (!deadlock) { //check if deadlock
      this.finalans.push('Deadlock');
    } else {
      // this.finalans.push("not deadlock");
      console.log('else');
      let flag = [];
      let ans = [];
      for (let i = 0; i < n; i++) {
        flag[i] = 0;
      }

      for (let i = 0; ans.length != n; i++) {
        for (let j = 0; j < n; j++) {
          if (flag[j] == 0) {
            let temp = false;
            for (let k = 0; k < 3; k++) {
              if (need[j][k] > availableResorces[k]) {   // if need is grater than available then deadlock
                temp = true;
                break;
              }
            }

            if (!temp) {
              for (let m = 0; m < n; m++) {
                availableResorces[m] += allocatedALL[j][m];
              }

              flag[j] = 1;
              ans.push(j);
            }
          }
        }
      }

      let ansstr;
      for (let i = 0; i < n; i++) {
        let str = ' P' + ans[i];
        // this.finalans.push(str);
        // ansstr = ansstr+str;
        this.finalans.push(str);   //  push final answer with process id
      }
    }

    this.string = this.finalans.join(' ');
    this.finalans = [];
  }
  hidetable() {
    if (this.table.length == 0) {  // hide table on back
      return false;
    } else {
      return true;
    }
  }

  refresh() {   // for refresh website
    window.location.reload();
  }

  openPDF(): void {   // download function
    console.log("Ejdn");
    let DATA: any = document.getElementById('mainTable');   // get canvas of id mainTable
      html2canvas(DATA).then((canvas) => {   // convert html to canvas
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');   // store canvas as pdf A4
        let position = 0;
        PDF.setFontSize(20);
        const heading = 'TEAM 4';   //title of pdf
        const headingWidth = PDF.getStringUnitWidth(heading) * PDF.getFontSize() / PDF.internal.scaleFactor;
        PDF.text(heading, PDF.internal.pageSize.width / 2 - headingWidth / 2, 15);
        position = 30;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        const now = new Date();
        const dateStr = now.toLocaleDateString();
        const timeStr = now.toLocaleTimeString();
        PDF.setFontSize(8);
        PDF.text(`Date: ${dateStr} Time: ${timeStr}`, 85, position + fileHeight + 10);  // date and time on pdf
      PDF.save('Banker.pdf');
    });
  }



  }
