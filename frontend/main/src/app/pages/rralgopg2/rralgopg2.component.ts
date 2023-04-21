import { Component } from '@angular/core';
import { SetdatarrService } from 'src/app/service/setdataarr.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//a comment
@Component({
  selector: 'app-rralgopg2',
  templateUrl: './rralgopg2.component.html',
  styleUrls: ['./rralgopg2.component.css'],
})
export class Rralgopg2Component {
  constructor(private setdata: SetdatarrService) { }

  //defigning the globle variables
  timequant: any;
  table: any = [];
  savetable: any = [];
  flow: any = [];
  keys: any = [];
  values: any = [];
  arrivalTime: any = [];
  burstTime: any = [];
  display: boolean = false;
  averageWaitingTime: any;
  averageTurnAroundTime: any;
  averageResponseTime: any;
  final: any = [];

  //setData function for sending the data to the database
  setData() {
    this.table.forEach((element: any) => {
      this.values.push(Object.values(element));
      this.keys = Object.keys(element);
    });
  }

  //Main logic that works on clicking the submit button
  submit(frames: any, istring: any, timeq: any) {
    this.display = true;
    this.flow.push(1);
    const top = document.getElementById('top');

    //EventListner for the style
    top?.addEventListener('click', function handleClick(event) {
      top.style.display = 'none';
    });

    //Getting the data from the datafields from html
    let arrivalTime = frames.split(',');
    let burstTime = istring.split(',');
    this.arrivalTime = frames.split(',');
    this.burstTime = istring.split(',');
    this.timequant = timeq;

    //Validations for thetimeQuanta that is inputed by the users
    if (timeq < 1) {
      console.log('enter positive values');
      alert('Please Enter positive value only!');
      window.location.reload();
      return;
    }
    if (timeq == '') {
      console.log('Input Require');
      alert('Please Input Track Data');
      window.location.reload();
      return;
    }

    //Validations for the arrivle time and burstTime
    for (let index = 0; index < arrivalTime.length; index++) {
      if (Number.isNaN(parseInt(arrivalTime[index]))) {
        alert('Enter appropriate values.');
        window.location.reload();
        return;
      }
      if (!Number.isInteger(parseInt(arrivalTime[index]))) {
        alert('Enter appropriate values.');
        window.location.reload();
        return;
      }
      if (Number.isNaN(parseInt(burstTime[index]))) {
        alert('Enter appropriate values.');
        window.location.reload();
        return;
      }
      if (!Number.isInteger(parseInt(burstTime[index]))) {
        alert('Enter appropriate values.');
        window.location.reload();
        return;
      }
      if(arrivalTime.length != burstTime.length){
        alert('Enter appropriate values.');
        window.location.reload();
        return;
      }
    }
    
    //Type casting the inputs from string to integers
    for (let index = 0; index < arrivalTime.length; index++) {
      arrivalTime[index] = parseInt(arrivalTime[index]);
      burstTime[index] = parseInt(burstTime[index]);
    }

    //defigning some local variables for the calculations
    let processSequence = [];
    let processSequenceTime = [];

    let n = arrivalTime.length;
    let complitionTime = [];
    let tempCT = [];

    let readyQueue = [];
    let complitionQueue = [];
    let readyQueueExists = [];

    //Prefilling the arrays
    for (let index = 0; index < n; index++) readyQueueExists[index] = false;
    let remainingBurstTime = [];
    for (let i = 0; i < n; i++) remainingBurstTime[i] = burstTime[i];
    let isComplited = [];
    for (let index = 0; index < n; index++) isComplited[index] = false;
    let firstTimeBools = [];
    for (let index = 0; index < n; index++) firstTimeBools[index] = false;
    let startTime = [];
    let responsiveTime = [];
    for (let index = 0; index < n; index++) {
      responsiveTime[index] = 0;
      startTime[index] = 0;
    }

    let time = 0;
    let tempTime = 0;
    let mahil = 0;
    let bool = false;

    //runnig the while loop until complition queue get filled completly
    while (complitionQueue.length != n) {

      //running this loop for linear insertion in the ready queue
      while (time != tempTime) {

        //Filling the insertion queue
        for (let index = 0; index < n; index++) {
          if (
            arrivalTime[index] <= tempTime &&
            readyQueueExists[index] == false &&
            isComplited[index] == false
          ) {
            readyQueue.push(index);
            readyQueueExists[index] = true;
          }
        }
        tempTime++;
      }

      //setting the boolean for the next insertion
      if (bool) {
        bool = false;
        readyQueue.push(mahil);
      }

      //checking the first element of the ready queue by
      //assigning it to the currentprocess variable
      if (readyQueue.length != 0) {
        let temp = 0;
        let currentProcess = readyQueue[0];

        //Storing the start time if the process is coming for the first time
        if (firstTimeBools[currentProcess] == false) {
          startTime[currentProcess] = time - 1;
          firstTimeBools[currentProcess] = true;
        }

        //will go in if if the timeQ is greater than remaining burst time
        if (remainingBurstTime[currentProcess] <= timeq) {
          processSequence.push('P' + currentProcess);
          processSequenceTime.push(time - 1);
          time = time + remainingBurstTime[currentProcess];//
          temp = time - 1;                                 // Storing the complition time
          complitionTime.push(temp);                       // 
          tempCT.push(currentProcess);                      
          isComplited[currentProcess] = true;// mark process as complited
          complitionQueue.push(currentProcess);
          readyQueue.splice(0, 1);//delete the process from the readyQueue
          time--;
        } 
        //will go in else if the the other case is applieed
        else {
          processSequence.push('P' + currentProcess);//keeping for the Gantt chart
          processSequenceTime.push(time - 1);        //
          remainingBurstTime[currentProcess] -= timeq;
          time = time + parseInt(timeq) - 1;//increase the time by adding the timeQ
          readyQueueExists[currentProcess] = true;
          mahil = currentProcess;
          readyQueue.splice(0, 1);
          bool = true;
        }
      }

      time++;//linear time incresing
    }

    processSequenceTime.push(time - 1);
    let flag = [];

    //Making the final complition time array
    for (let index = 0; index < n; index++) {
      flag[tempCT[index]] = complitionTime[index];
    }
    for (let index = 0; index < n; index++) {
      complitionTime[index] = flag[index];
    }

    let waitingTime = [];
    let TATime = [];

    //Calculating the TAT,WT and RT
    for (let index = 0; index < n; index++) {
      TATime[index] = complitionTime[index] - arrivalTime[index];
      waitingTime[index] = TATime[index] - burstTime[index];
      responsiveTime[index] = startTime[index] - arrivalTime[index];
    }

    //Calculating the average of required times
    let avgRT = 0,
      avgTAT = 0,
      avgWT = 0;
    for (let i = 0; i < n; i++) {
      avgTAT += TATime[i];
      avgWT += waitingTime[i];
      avgRT += responsiveTime[i];
    }
    avgTAT = avgTAT / n;
    avgRT = avgRT / n;
    avgWT = avgWT / n;
    this.averageTurnAroundTime = 'AverageTurnAroundTime: ' + avgTAT;
    this.averageWaitingTime = 'AverageWaitingTime: ' + avgWT;
    this.averageResponseTime = 'AverageResponseTime: ' + avgRT;

    //showing the table 
    for (let i = 0; i < n; i++) {
      let b = 'P' + i;
      this.table.push({
        Name: b,
        AT: arrivalTime[i],
        BT: burstTime[i],
        CT: complitionTime[i],
        WT: waitingTime[i],
        TAT: TATime[i],
        ST: startTime[i],
        RT: responsiveTime[i],
      });
      this.savetable.push({
        name: b,
        arrival: arrivalTime[i],
        burst: burstTime[i],
        compilation: complitionTime[i],
        waiting: waitingTime[i],
        turnaround: TATime[i],
        start: startTime[i],
        rt: responsiveTime[i],
      });
    }

    this.setData();
    console.log(this.savetable);
    this.setdata.saverr(this.savetable).subscribe(
      (data) => { console.log(data); },
      (error) => { console.log(error); }
      );
    //Gantt chart code :: 
    let objtemp: any = {};
    objtemp['color'] = 'rgb(255, 255, 255,0.9)';
    objtemp['pid'] = 'Pid';
    objtemp['time'] = processSequenceTime[0];
    this.final.push(objtemp);
    const randomColors = [];//Getting random colors for the Gantt chart
    for (let i = 0; i < this.table.length; i++) {
      randomColors.push(this.getRandomColor());
    }

    //making the Gantt chart
    for (let i = 0; i < processSequence.length; i++) {
      let obj: any = {};
      obj['pid'] = processSequence[i];
      obj['color'] = randomColors[parseInt(processSequence[i].substring(1))];
      obj['time'] = processSequenceTime[i + 1];
      this.final.push(obj);
    }
  }

  //Refresh function
  refresh() {
    window.location.reload();
  }

  //Get loading effect
  DelayRedirect() {
    let flag = 0;
    setInterval(function () {
      if (flag == 0) {
        const loadingElement = document.getElementById('loading-animation')!;
        loadingElement.style.display = 'none';
        flag = 1;
      }
    }, 250);
  }

  // Random RGB colors
  getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    if (r == 0 && g == 0 && b == 0) {
      return `rgb(255, 255, 255,0.7)`;
    }
    return `rgb(${r}, ${g}, ${b},0.7)`;
  }
  getLoading() {
    // Add event listener here
    //Creating the element for the Iner HTML
    const button = document.getElementById('fullscreen-button');

    //event Listner
    button?.addEventListener('click', function handleClick(event) {
      const loadingElement = document.createElement('div');
      loadingElement.innerHTML =
        '<div id="ani" style="position: absolute;top: 0%;width: 100%;background: black;opacity: 0.6;z-index: 100;height: 100%;"class="d-flex justify-content-center"><div style="position:absolute;top:50%;height:85px;width:85px" class="spinner-border" role="status"><span class="sr-only"></span></div></div>';
      loadingElement.id = 'loading-animation';
      loadingElement
        .querySelector('.loading-spinner')
        ?.classList.add('loading-spinner-style');
      document.body.appendChild(loadingElement);//Appending the chilld to the HTML
    });
  }

  //Download PDF function
  openPDF(): void {
    let DATA: any = document.getElementById('tab');//getting the ID of printing elements

      //Converting HTML to Canvas
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');//upload canvas  as image
        let PDF = new jsPDF('p', 'mm', 'a4');///converting image as A4 PDF
        let position = 0;   // positioning
        PDF.setFontSize(20);//
        const heading = 'TEAM 4';//title of the PDF
        const headingWidth = PDF.getStringUnitWidth(heading) * PDF.getFontSize() / PDF.internal.scaleFactor;
        PDF.text(heading, PDF.internal.pageSize.width / 2 - headingWidth / 2, 15);
        position = 30;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

        //Getting current date and time to prinnt at the end
        const now = new Date();
        const dateStr = now.toLocaleDateString();
        const timeStr = now.toLocaleTimeString();
        PDF.setFontSize(8);
        PDF.text(`Date: ${dateStr} Time: ${timeStr}`, 85, position + fileHeight + 10);//date and time added
      PDF.save('RR.pdf');//save PDF
    });
  }
}
