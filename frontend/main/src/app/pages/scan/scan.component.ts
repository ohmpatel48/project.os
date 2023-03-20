import { AfterViewInit, Component, ViewChild } from '@angular/core';
// import { Chart } from 'chart.js';
import { SetdatarrService } from 'src/app/service/setdataarr.service';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent{
  constructor(private setdata : SetdatarrService) {}
  @ViewChild('mychart') canvasRef: any;
  selected: any;
  finalans1: any;
  finalarr1: any = [];
  finalans2: any;
  finalarr2: any = [];
  seck:any =[];
   obj2: any;
   obj1: any;
  cscan(h_pos: any, ftrack: any): void {
    if (h_pos < 0) {
      console.log('enter positive values');
      alert('Please Enter positive value only!');
    }
    if (h_pos == '') {
      console.log('Input Require');
      alert('Please Input Track Data');
    }

    // console.log(ftrack);
    var arr = ftrack.split(',');

    let seek_count = 0;
    let i;
    let distance, cur_track;
    let left = [],
      right = [];
    let seek_sequence = [];

    let disk_size = 200;
    let size = arr.length;
    let direction1 = this.selected;
    this.obj1={head:h_pos,array:arr,flow:direction1};
    this.setdata.savecscan(this.obj1).subscribe(
      (data) => {
      console.log(data);
      },
      (error) => console.log(error)
    );

    seek_sequence.push(h_pos);

    left.push(0);
    right.push(disk_size - 1);

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

    // first service the requests
    // on the right side of the
    // head.
    if (direction1 == 'r') {
      for (let i = 0; i < right.length; i++) {
        seek_sequence.push(right[i]);
      }

      for (let i = 0; i < left.length; i++) {
        seek_sequence.push(left[i]);
      }
    } else if (direction1 == 'l') {
      for (let i = left.length - 1; i >= 0; i--) {
        seek_sequence.push(left[i]);
      }

      for (let i = right.length - 1; i >= 0; i--) {
        seek_sequence.push(right[i]);
      }
    }

    var result = '';
    for (let i = 0; i < seek_sequence.length - 1; i++) {
      if (seek_sequence[i] < 0) {
        alert('Enter positive value only!');
        break;
      }
      result += seek_sequence[i] + ',';
    }
    result = result + seek_sequence[seek_sequence.length - 1];

    var seek_time = 0;
    for (let i = 0; i < seek_sequence.length - 1; i++) {
      seek_time += Math.abs(seek_sequence[i] - seek_sequence[i + 1]);
    }
    this.seck=seek_sequence;
    console.log(result);
    // console.log(seek_count);

    console.log(seek_time);
    this.finalans1 = seek_time;
    this.finalarr1 = result;

  }

  scan(h_pos: any, ftrack: any): void {
  
    if (h_pos < 0) {
      console.log('enter positive values');
      alert('Please Enter positive value only!');
    }

    // console.log(ftrack);
    var arr = ftrack.split(',');

    

    let seek_count = 0;
    let distance, cur_track;
    let left = [],
      right = [];
    let i;
    let seek_sequence = [];
    let disk_size = 200;
    let size = arr.length;
    var direction1 = this.selected;

    this.obj2={head:h_pos,array:arr,flow:direction1};
    this.setdata.savescan(this.obj2).subscribe(
      (data) => {
      console.log(data);
      },
      (error) => console.log(error)
    );

    seek_sequence.push(h_pos);

    left.push(0);
    right.push(disk_size - 1);

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

    // first service the requests
    // on the right side of the
    // head.

    let run = 2;
    while (run-- > 0) {
      if (direction1 == 'l') {
        // Time Complexity: O(left.length)
        for (let i = left.length - 1; i >= 0; i--) {
          seek_sequence.push(left[i]);
        }
        direction1 = 'r';
      }
      // Time Complexity: O(right.length)
      else if (direction1 == 'r') {
        for (let i = 0; i < right.length; i++) {
          // appending current track to seek sequence
          seek_sequence.push(right[i]);
        }
        direction1 = 'l';
      }
    }

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

    var seek_time = 0;
    for (let i = 0; i < seek_sequence.length - 1; i++) {
      seek_time += Math.abs(seek_sequence[i] - seek_sequence[i + 1]);
    }

    this.finalarr2 = result;
    console.log(result);
    // console.log(seek_count);
    this.finalans2 = seek_time;
    console.log(seek_time);

    
  }
   showGraph():void{
    var xAxis = this.seck;
    var yAxis = [1,34,5,6,7,8,2];
    console.log(xAxis);
    console.log(yAxis);
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    
    // var myChart = new Chart(ctx, {
    //   type: "line",
    //   data: {
    //     labels: yAxis,
    //     datasets: [
    //       {
    //         data: xAxis,
    //         borderWidth: 3,
    //       },
    //     ],
    //   },
    //   options: {
    //     plugins: {
    //       legend: {
    //         display: false,
    //       },
    //     },
    //     indexAxis: "y",
    //     scales: {
    //       y: {
    //         position: "left",
    //         title: {
    //           display: true,
    //           text: "Process Number",
    //           font: {
    //             size: 20,
    //           },
    //         },
    //       },
    //       x: {
    //         position: "top",
    //         grid: {
    //           display: true,
    //         },
    //         title: {
    //           display: true,
    //           text: "Burst time",
    //           font: {
    //             size: 20,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
  }
}
