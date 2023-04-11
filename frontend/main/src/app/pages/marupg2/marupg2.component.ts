import { Component } from '@angular/core';
import { SetdatarrService } from 'src/app/service/setdataarr.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-marupg2',
  templateUrl: './marupg2.component.html',
  styleUrls: ['./marupg2.component.css'],
})
export class Marupg2Component {

  constructor(private setdata: SetdatarrService) { }

  tableData: any = [];
  savedata: any = {};
  frames: any;
  pages: any = [];
  summary: any;
  output: any;
  tf: any;
  tp: any;
  sp: any;
  observation: any;
  tr: any;
  nh: any;
  nf: any;
  hr: any;
  fr: any;

  keys: any = [];
  values: any = [];
  hitcount = 0;
  misscount = 0;
  flow: any = [];
  getData() {
    this.tableData.forEach((element: any) => {
      this.values.push(Object.values(element));
      this.keys = Object.keys(element);
    });
  }

  submit(frames: any, istring: any) {

    this.flow.push(1);
    const top = document.getElementById('top');

    top?.addEventListener('click', function handleClick(event) {
      top.style.display = 'none';
    });
    document.getElementById('bottom')!.style.display = 'block';
    // bottom?.addEventListener('click', function handleClick(event) {
    //   bottom.style.display = "block";
    // });

    this.frames = frames;

    if (parseInt(frames) < 1) {
      console.log('enter positive values');
      alert('Please Enter positive value only!');
      window.location.reload();
      return;
    }
    if (parseInt(frames) == null) {
      console.log('Input Require');
      alert('Please Input Track Data');
      window.location.reload();
      return;
    }

    this.pages = istring.split(',');
    var arr = [];
    arr = istring.split(',');
    for (let index = 0; index < arr.length; index++) {
      if (Number.isNaN(parseInt(arr[index]))) {
        alert('Enter appropriate values.');
        window.location.reload();
        return;
      }
    }
    for (let index = 0; index < arr.length; index++) {
      if (!Number.isInteger(parseInt(arr[index]))) {
        alert('Enter appropriate values.');
        window.location.reload();
        return;
      }
    }
    this.savedata['frames'] = this.frames;
    this.savedata['array'] = this.pages;
    this.setdata.savemru(this.savedata).subscribe(
      (data: any) => console.log(data),
      (error) => console.log(error)
    );
    let count = 0;
    let n = this.pages.length;

    let hit = [];
    let inst = [];
    let v = [];
    for (let index = 0; index < this.pages.length; index++) {
      hit[index] = 'No';
      v[index] = '-';
      // for (let j = 0; j < frames; j++) {
      //     inst[index][j]="-";
      // }
    }
    let mentian = [];
    for (var i = 0; i < n; i++) {
      let temp3 = [];
      var idx = inst.indexOf(this.pages[i]);
      if (idx == -1) {
        if (inst.length < frames) {
          // inst.push(pages[i]);
          inst.unshift(this.pages[i]);
        } else {
          v[i] = inst[0];
          inst.splice(0, 1);
          inst.unshift(this.pages[i]);
        }
        this.misscount++;
      } else {
        inst.splice(inst.indexOf(this.pages[i]), 1);
        inst.unshift(this.pages[i]);
        hit[i] = 'Yes';
        this.hitcount++;
      }
      for (let k = 0; k < frames; k++) {
        if (inst[k] == undefined) {
          temp3[k] = '-';
        } else {
          temp3[k] = inst[k];
        }
      }

      mentian.push(temp3);
    }
    for (let index = 0; index < this.pages.length; index++) {
      let temp: any = {};
      let tempstring = 'P' + count;
      count++;
      temp[`Name`] = tempstring;
      temp[`Page`] = this.pages[index];
      for (let i = 0; i < frames; i++) {
        temp[`Frame${i + 1}`] = mentian[index][i];
      }
      temp[`Hit`] = hit[index];
      temp[`Replaced`] = v[index];
      this.tableData.push(temp);
    }
    this.getData();

    this.summary = 'Summary:-';
    this.output = 'Output';
    this.tf = 'Total Frames' + ': ' + this.frames;
    this.tp = 'Total Pages' + ': ' + this.pages.length;
    this.sp = 'Total Page Faults' + ': ' + this.pages;
    this.observation = 'Observation:-';
    this.tr = 'Total Reference' + ': ' + this.pages.length;
    this.nh = 'Number of Hits' + ': ' + this.hitcount;
    this.nf = 'Number of Faults' + ': ' + this.misscount;
    this.hr =
      'Hit Ratio' + ': ' + (this.hitcount / this.pages.length) * 100 + '%';
    this.fr =
      'Fault Ratio' + ': ' + (this.misscount / this.pages.length) * 100 + '%';
  }

  getcolor(value: string): any {
    if ('No' == value) {
      return { 'background-color': '#ff6961' };
    } else if ('Yes' == value) {
      return { 'background-color': '#77dd77' };
    } else {
      return { 'background-color': 'none' };
    }
  }

  refresh() {
    window.location.reload();
  }
  openPDF(): void {
    let DATA: any = document.getElementById('tt');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.setFontSize(20);
      const heading = 'TEAM 4';
      const headingWidth = PDF.getStringUnitWidth(heading) * PDF.getFontSize() / PDF.internal.scaleFactor;
      PDF.text(heading, PDF.internal.pageSize.width / 2 - headingWidth / 2, 15);
      position = 30;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();
      PDF.setFontSize(8);
      PDF.text(`Date: ${dateStr} Time: ${timeStr}`, 85, position + fileHeight + 10);
      PDF.save('MRU.pdf');
    });
  }
}
