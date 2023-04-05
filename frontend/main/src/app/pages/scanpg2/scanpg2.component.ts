
import { AfterViewInit, Component, ViewChild } from '@angular/core';
// import { Chart } from 'chart.js';
// import { SetdatarrService } from 'src/app/service/setdataarr.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-fri',
  templateUrl: './scanpg2.component.html',
  styleUrls: ['./scanpg2.component.css'],
})

export class Scanpg2Component {
  constructor() { }
  @ViewChild('mychart') canvasRef: any;
  selected: any;
  finalans1: any;
  finalarr1: any = [];
  finalans2: any;
  finalarr2: any = [];
  seck: any = [];
  obj2: any;
  obj1: any;
  flow: any = [];

  // C-Scan
    cscan(h_pos: any, ftrack: any): void 
    {
    
          document.getElementById('cs')!.style.display = 'flex';
          document.getElementById('top')!.style.display = 'none';
          document.getElementById('bottom')!.style.display = 'block';

        if (h_pos < 0) 
          {
            console.log('enter positive values');
            alert('Please Enter positive value only!');
          }

        if (h_pos == '') 
          {
            console.log('Input Require');
            alert('Please Input Track Data');
          }

    // console.log(ftrack);
        var arr = ftrack.split(',');

    // declarations 
        let seek_count = 0;
        let i;
        let distance, cur_track;
        let left = [],
        right = [];
        let seek_sequence = [];

        let disk_size = 200;
        let size = arr.length;
        let btnradio = this.selected;
        this.obj1 = { head: h_pos, array: arr, flow: btnradio };

        // this.setdata.savecscan(this.obj1).subscribe(
        //   (data) => {
        //   console.log(data);
        //   },
        //   (error) => console.log(error)
        // );

        seek_sequence.push(h_pos);
        left.push(0);
        right.push(disk_size - 1);

          for (let i = 0; i < size; i++) 
              {
                  if (arr[i] < h_pos) left.push(arr[i]);
                  if (arr[i] > h_pos) right.push(arr[i]);
              }

      // sorting left and right vectors
          left.sort
          (function (a, b) 
            {
              return a - b;
            }
          );

          right.sort
          (function (a, b) 
            {
              return a - b;
            }
          );

      // first service the requests on the right side of the head.
          console.log(btnradio);
          if (btnradio == 'l') 
          {
            for (let i = 0; i < right.length; i++) 
              {
                  seek_sequence.push(right[i]);
              }

            for (let i = 0; i < left.length; i++) 
              {
                  seek_sequence.push(left[i]);
              }
          } 
                else if 
                  (btnradio == 'r') 
                    {
                        for (let i = left.length - 1; i >= 0; i--) 
                            {
                                seek_sequence.push(left[i]);
                            }

                        for (let i = right.length - 1; i >= 0; i--) 
                        {
                                seek_sequence.push(right[i]);
                        }
                    }

        if (seek_sequence[seek_sequence.length - 1] == 0 || seek_sequence[seek_sequence.length - 1] == disk_size - 1) 
            {
                    seek_sequence.splice(seek_sequence.length - 1, 1);
          if (seek_sequence[seek_sequence.length - 1] == 0 || seek_sequence[seek_sequence.length - 1] == disk_size - 1) 
                {
                    seek_sequence.splice(seek_sequence.length - 1, 1);
                }
            } 

      var result = '';
        for (let i = 0; i < seek_sequence.length - 1; i++) 
          {
            if (seek_sequence[i] < 0) 
              {
                alert('Enter positive value only!');
                break;
              
              }
            result += seek_sequence[i] + ',';
          }
        result = result + seek_sequence[seek_sequence.length - 1];

      var seek_time = 0;
        for (let i = 0; i < seek_sequence.length - 1; i++) 
          {
            seek_time += Math.abs(seek_sequence[i] - seek_sequence[i + 1]);
          }

    // this.seck = seek_sequence;
    console.log(result);
    // console.log(seek_count);

    console.log(seek_time);
    this.finalans1 = seek_time;
    this.finalarr1 = seek_sequence;
    this.showGraphCS();

  }

// Scan 
  scan(h_pos: any, ftrack: any): void 
  {

      this.flow.push(1);
      document.getElementById('s')!.style.display = 'flex';
      document.getElementById('top')!.style.display = 'none';
      document.getElementById('bottom')!.style.display = 'block';

        if (h_pos < 0) 
            {
              console.log('enter positive values');
              alert('Please Enter positive value only!');
            }

    // console.log(ftrack);
        var arr = ftrack.split(',');

    // declarations
        let seek_count = 0;
        let distance, cur_track;
        let left = [],
            right = [];
        let i;
        let seek_sequence = [];
        let disk_size = 200;
        let size = arr.length;
        var btnradio = this.selected;
    
        this.obj2 = { head: h_pos, array: arr, flow: btnradio };

        // this.setdata.savescan(this.obj2).subscribe(
        //   (data) => {
        //   console.log(data);
        //   },
        //   (error) => console.log(error)
        // );

        seek_sequence.push(h_pos);
        left.push(0);
        right.push(disk_size - 1);

          for (let i = 0; i < size; i++) 
            {
              if (arr[i] < h_pos) left.push(arr[i]);
              if (arr[i] > h_pos) right.push(arr[i]);
            }

      // sorting left and right vectors
        left.sort
        (function (a, b) 
        {
          return a - b;
        });
        right.sort
        (function (a, b) 
        {
          return a - b;
        });

      // first service the requests on the right side of the head.

        let run = 2;
        while (run-- > 0) 
            {
                if (btnradio == 'l') 
                    {
              // Time Complexity: O(left.length)
                        for (let i = left.length - 1; i >= 0; i--) 
                             {
                                seek_sequence.push(left[i]);
                            }
                            btnradio = 'r';
                    }
              // Time Complexity: O(right.length)
                else if (btnradio == 'r') 
                    {
                        for (let i = 0; i < right.length; i++) 
                              {
                  // appending current track to seek sequence
                                seek_sequence.push(right[i]);
                              }
                        btnradio = 'l';
                    }
              }

      if (seek_sequence[seek_sequence.length - 1] == 0 || seek_sequence[seek_sequence.length - 1] == disk_size - 1) {
      seek_sequence.splice(seek_sequence.length - 1, 1);
      if (seek_sequence[seek_sequence.length - 1] == 0 || seek_sequence[seek_sequence.length - 1] == disk_size - 1) {
        seek_sequence.splice(seek_sequence.length - 1, 1);
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

    this.finalarr2 = seek_sequence;
    console.log(result);
    // console.log(seek_count);
    this.finalans2 = seek_time;
    console.log(seek_time);

    this.showGraphS();
  }

  showGraphCS(): void {


    document.getElementById('Chart1')!.style.display='flex';

    new Chart('myChart1', {
      type: "line",
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
        indexAxis: "y",
        scales: {
          y: {
            position: "left",
            title: {
              display: true,
              text: "Process Number",
              font: {
                size: 20,
              },
            },
          },
          x: {

            position: "top",
            grid: {
              display: true,
            },
            title: {
              display: true,
              text: "Burst time",
              font: {
                size: 20,
              },
            },
          },
        },
      },
    });


  }

  showGraphS(): void {


    document.getElementById('Chart2')!.style.display="flex";

    new Chart('myChart2', {
      type: "line",
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
        indexAxis: "y",
        scales: {
          y: {
            position: "left",
            title: {
              display: true,
              text: "Process Number",
              font: {
                size: 20,
              },
            },
          },
          x: {

            position: "top",
            grid: {
              display: true,
            },
            title: {
              display: true,
              text: "Burst time",
              font: {
                size: 20,
              },
            },
          },
        },
      },
    });


  }
  // getLoading() {
  //   // Add event listener here

  //   const button = document.getElementById('fullscreen-button');

  //   button?.addEventListener('click', function handleClick(event) {
  //     const loadingElement = document.createElement('div');
  //     loadingElement.innerHTML = '<div id="ani" style="position: absolute;top: 0%;width: 100%;background: black;opacity: 0.6;z-index: 100;height: 100%;"class="d-flex justify-content-center"><div style="position:absolute;top:50%;height:85px;width:85px" class="spinner-border" role="status"><span class="sr-only"></span></div></div>';
  //     loadingElement.id = 'loading-animation';
  //     // loadingElement.querySelector('.loading-spinner')?.classList.add('loading-spinner-style');
  //     document.body.appendChild(loadingElement);
  //   });

  // }
  refresh() {
    window.location.reload();
  }
//   DelayRedirect() {
//     let flag = 0;
//     setInterval(function () {
//       if (flag == 0) {
//         const loadingElement = document.getElementById('loading-animation')!;
//         loadingElement.style.display = "none";
//         flag = 1;
//       }
//     }, 250);
//   }
 }
