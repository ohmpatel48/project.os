import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SetdatarrService } from 'src/app/service/setdataarr.service';
import { Chart, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
Chart.register(...registerables);

@Component({
  selector: 'app-fri',
  templateUrl: './scanpg2.component.html',
  styleUrls: ['./scanpg2.component.css'],
})

export class Scanpg2Component {
  constructor(private setdata: SetdatarrService) { }
  @ViewChild('mychart') canvasRef: any;

  //declaring the globle variables
  selected: any;
  finalans1: any;
  finalarr1: any = [];
  finalans2: any;
  finalarr2: any = [];
  seck: any = [];
  obj2: any;
  obj1: any;
  flow: any = [];

  // C-Scan function
  cscan(h_pos: any, ftrack: any): void {
    document.getElementById('cs')!.style.display = 'flex';
    document.getElementById('top')!.style.display = 'none';
    document.getElementById('bottom')!.style.display = 'block';
    document.getElementById('cdownload')!.style.display = 'block';


    //checking the --validations--
    if (h_pos < 0) {
      console.log('enter positive values');
      alert('Please Enter positive value only!');
    }
    if (h_pos == '') {
      console.log('Input Require');
      alert('Please Input Track Data');
    }

    var arr = ftrack.split(',');

    //checking the --validationn-- for the sequence
    for (let index = 0; index < arr.length; index++) {
      if (Number.isNaN(parseInt(arr[index]))) {
        alert('Enter appropriate values.');
        window.location.reload();
        return;
      }
      if (!Number.isInteger(parseInt(arr[index]))) {
        alert('Enter appropriate values.');
        window.location.reload();
        return;
      }
    }

    //declarinng some neccesorry variables
    let left = [],right = [];
    let seek_sequence = [];
    let disk_size = 200;//declaring the disk size
    let size = arr.length;
    let btnradio = this.selected;//assigning direction
    this.obj1 = { head: h_pos, array: arr, flow: btnradio };

    //Validations for the Direction
    if (btnradio == null) {
      alert("Select direction...");
      window.location.reload();
      return;
    }

    //pushing the data into the database
    this.setdata.savecscan(this.obj1).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );

    //Default pushes to the array
    seek_sequence.push(h_pos);
    left.push(0);
    right.push(disk_size - 1);

    //pushing the left and right tracks to the arrays
    for (let i = 0; i < size; i++) {
      if (arr[i] < h_pos) left.push(arr[i]);
      if (arr[i] > h_pos) right.push(arr[i]);
    }

    // sorting left and right vectors
    left.sort(function (a, b) {
      return a - b;
    });
    right.sort(function (a, b) {
      return a - b;
    });
    
    // servicing the requests on the each side of the head accordingly.
    if (btnradio == 'l') {
      for (let i = 0; i < right.length; i++) {
        seek_sequence.push(right[i]);
      }

      for (let i = 0; i < left.length; i++) {
        seek_sequence.push(left[i]);
      }
    } else if (btnradio == 'r') {
      for (let i = left.length - 1; i >= 0; i--) {
        seek_sequence.push(left[i]);
      }

      for (let i = right.length - 1; i >= 0; i--) {
        seek_sequence.push(right[i]);
      }
    }

    //Deleting the unneccesory tracks at the end of the array.
    if (
      seek_sequence[seek_sequence.length - 1] == 0 ||
      seek_sequence[seek_sequence.length - 1] == disk_size - 1
    ) {
      seek_sequence.splice(seek_sequence.length - 1, 1);
      if (
        seek_sequence[seek_sequence.length - 1] == 0 ||
        seek_sequence[seek_sequence.length - 1] == disk_size - 1
      ) {
        seek_sequence.splice(seek_sequence.length - 1, 1);
      }
    }

    //Creating the answer string according to the seek sequence.
    var result = '';
    for (let i = 0; i < seek_sequence.length - 1; i++) {
      if (seek_sequence[i] < 0) {
        alert('Enter positive value only!');
        break;
      }
      result += seek_sequence[i] + ',';
    }
    result = result + seek_sequence[seek_sequence.length - 1];

    //Calculating the seek time based on the seek sequence.
    var seek_time = 0;
    for (let i = 0; i < seek_sequence.length - 1; i++) {
      seek_time += Math.abs(seek_sequence[i] - seek_sequence[i + 1]);
    }

    this.finalans1 = seek_time;
    this.finalarr1 = seek_sequence;
    this.showGraphCS();
  }

  // Scan function
  scan(h_pos: any, ftrack: any): void {
    this.flow.push(1);
    document.getElementById('s')!.style.display = 'flex';
    document.getElementById('top')!.style.display = 'none';
    document.getElementById('bottom')!.style.display = 'block';
    document.getElementById('sdownload')!.style.display = 'block';


    //checking the --validations--
    if (h_pos < 0) {
      console.log('enter positive values');
      alert('Please Enter positive value only!');
    }
    if (h_pos == '') {
      console.log('Input Require');
      alert('Please Input Track Data');
    }

    var arr = ftrack.split(',');

    //checking the --validationn-- for the sequence
    for (let index = 0; index < arr.length; index++) {
      if (Number.isNaN(parseInt(arr[index]))) {
        alert('Enter appropriate values.');
        window.location.reload();
        return;
      }
      if (!Number.isInteger(parseInt(arr[index]))) {
        alert('Enter appropriate values.');
        window.location.reload();
        return;
      }
    }

    //declarinng some neccesorry variables
    let left = [],right = [];
    let seek_sequence = [];
    let disk_size = 200;//declaring the disk size
    let size = arr.length;
    var btnradio = this.selected;//assigning direction
    this.obj2 = { head: h_pos, array: arr, flow: btnradio };

    //Validations for the Direction
    if (btnradio == null) {
      alert("Select direction...");
      window.location.reload();
      return;
    }

    //pushing the data into the database
    this.setdata.savescan(this.obj2).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );

    //Default pushes to the array
    seek_sequence.push(h_pos);
    left.push(0);
    right.push(disk_size - 1);

    //pushing the left and right tracks to the arrays
    for (let i = 0; i < size; i++) {
      if (arr[i] < h_pos) left.push(arr[i]);
      if (arr[i] > h_pos) right.push(arr[i]);
    }

    // sorting left and right vectors
    left.sort(function (a, b) {
      return a - b;
    });
    right.sort(function (a, b) {
      return a - b;
    });

    // servicing the requests on the each side of the head accordingly.
    let run = 2;
    while (run-- > 0) {
      if (btnradio == 'l') {
        // Time Complexity: O(left.length)
        for (let i = left.length - 1; i >= 0; i--) {
          seek_sequence.push(left[i]);
        }
        btnradio = 'r';
      }
      // Time Complexity: O(right.length)
      else if (btnradio == 'r') {
        for (let i = 0; i < right.length; i++) {
          // appending current track to seek sequence
          seek_sequence.push(right[i]);
        }
        btnradio = 'l';
      }
    }

    //Deleting the unneccesory tracks at the end of the array.
    if (
      seek_sequence[seek_sequence.length - 1] == 0 ||
      seek_sequence[seek_sequence.length - 1] == disk_size - 1
    ) {
      seek_sequence.splice(seek_sequence.length - 1, 1);
      if (
        seek_sequence[seek_sequence.length - 1] == 0 ||
        seek_sequence[seek_sequence.length - 1] == disk_size - 1
      ) {
        seek_sequence.splice(seek_sequence.length - 1, 1);
      }
    }

    //Creating the answer string according to the seek sequence.
    var result = '';
    for (let i = 0; i < seek_sequence.length - 1; i++) {
      console.log(seek_sequence[i]);
      if (seek_sequence[i] < 0) {
        alert('Enter positive value only!');
        break;
      }
      result += seek_sequence[i] + ',';
    }
    result = result + seek_sequence[seek_sequence.length - 1];

    //Calculating the seek time based on the seek sequence.
    var seek_time = 0;
    for (let i = 0; i < seek_sequence.length - 1; i++) {
      seek_time += Math.abs(seek_sequence[i] - seek_sequence[i + 1]);
    }

    this.finalarr2 = seek_sequence;
    this.finalans2 = seek_time;
    this.showGraphS();
  }

  //Graph for the CSCAN function.
  showGraphCS(): void {
    document.getElementById('Chart1')!.style.display = 'flex';

    new Chart('myChart1', {
      type: 'line',
      data: {
        labels: this.finalarr1,
        datasets: [
          {
            data: this.finalarr1,
            borderWidth: 3,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        indexAxis: 'y',
        scales: {
          y: {
            position: 'left',
            title: {
              display: true,
              text: 'Process Number',
              font: {
                size: 20,
              },
            },
          },
          x: {
            //assigning the X-Axes to the top
            //for the particular shape of the graph
            position: 'top',
            grid: {
              display: true,
            },
            title: {
              display: true,
              text: 'Burst time',
              font: {
                size: 20,
              },
            },
          },
        },
      },
    });
  }

  //Graph for the SCAN function.
  showGraphS(): void {
    document.getElementById('Chart2')!.style.display = 'flex';

    new Chart('myChart2', {
      type: 'line',
      data: {
        labels: this.finalarr2,
        datasets: [
          {
            data: this.finalarr2,
            borderWidth: 3,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        indexAxis: 'y',
        scales: {
          y: {
            position: 'left',
            title: {
              display: true,
              text: 'Process Number',
              font: {
                size: 20,
              },
            },
          },
          x: {
            //assigning the X-Axes to the top
            //for the particular shape of the graph
            position: 'top',
            grid: {
              display: true,
            },
            title: {
              display: true,
              text: 'Burst time',
              font: {
                size: 20,
              },
            },
          },
        },
      },
    });
  }

  //refresh function
  refresh() {
    window.location.reload();
  }
  openPDF(): void {
    let DATA: any = document.getElementById('cscan');
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
      PDF.save('CSCAN.pdf');
    });
  }

  openPDFSCAN(): void {
    let DATA: any = document.getElementById('scan');
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
      PDF.save('SCAN.pdf');
    });
  }
}
