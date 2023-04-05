import { Component } from '@angular/core';

@Component({
  selector: 'app-rralgopg2',
  templateUrl: './rralgopg2.component.html',
  styleUrls: ['./rralgopg2.component.css'],
})
export class Rralgopg2Component {
  constructor() {}

  timequant: any;
  table: any = [];
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

  setData() {
    this.table.forEach((element: any) => {
      this.values.push(Object.values(element));
      this.keys = Object.keys(element);
    });
  }
  submit(frames: any, istring: any, timeq: any) {
    this.display = true;
    this.flow.push(1);
    const top = document.getElementById('top');
    top?.addEventListener('click', function handleClick(event) {
      top.style.display = 'none';
    });

    let arrivalTime = frames.split(',');
    let burstTime = istring.split(',');
    this.arrivalTime = frames.split(',');
    this.burstTime = istring.split(',');
    this.timequant = timeq;
    for (let index = 0; index < arrivalTime.length; index++) {
      arrivalTime[index] = parseInt(arrivalTime[index]);
      burstTime[index] = parseInt(burstTime[index]);
    }

    let processSequence = [];
    let processSequenceTime = [];

    let n = arrivalTime.length;
    let complitionTime = [];
    let tempCT = [];

    let readyQueue = [];
    let complitionQueue = [];
    let readyQueueExists = [];
    for (let index = 0; index < n; index++) readyQueueExists[index] = false;
    let remainingBurstTime = [];
    for (let i = 0; i < n; i++) {
      remainingBurstTime[i] = burstTime[i];
    }
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

    // for (let index = 0; index < n; index++)complitionTime[index] = 0;
    let time = 0;
    let tempTime = 0;
    let mahil = 0;
    let bool = false;

    while (complitionQueue.length != n) {
      while (time != tempTime) {
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

      if (bool) {
        bool = false;
        readyQueue.push(mahil);
      }

      if (readyQueue.length != 0) {
        let temp = 0;
        let currentProcess = readyQueue[0];
        if (firstTimeBools[currentProcess] == false) {
          startTime[currentProcess] = time - 1;
          firstTimeBools[currentProcess] = true;
        }
        // console.log(currentProcess);
        if (remainingBurstTime[currentProcess] <= timeq) {
          processSequence.push('P' + currentProcess);
          processSequenceTime.push(time - 1);
          time = time + remainingBurstTime[currentProcess];
          temp = time - 1;
          complitionTime.push(temp);
          tempCT.push(currentProcess);
          // this.table[currentProcess].compilation = complitionTime[currentProcess];
          isComplited[currentProcess] = true;
          complitionQueue.push(currentProcess);
          readyQueue.splice(0, 1);
          time--;
        } else {
          processSequence.push('P' + currentProcess);
          processSequenceTime.push(time - 1);
          remainingBurstTime[currentProcess] -= timeq;
          time = time + parseInt(timeq) - 1;

          readyQueueExists[currentProcess] = true;
          mahil = currentProcess;
          // let temp =0;
          // temp =  readyQueue[0];
          // readyQueue.push(readyQueue[0]);
          readyQueue.splice(0, 1);
          bool = true;
          // readyQueue.push(temp);
        }
      }

      time++;
    }

    processSequenceTime.push(time - 1);
    let flag = [];
    for (let index = 0; index < n; index++) {
      flag[tempCT[index]] = complitionTime[index];
    }
    for (let index = 0; index < n; index++) {
      complitionTime[index] = flag[index];
    }

    let waitingTime = [];
    let TATime = [];

    for (let index = 0; index < n; index++) {
      TATime[index] = complitionTime[index] - arrivalTime[index];
      waitingTime[index] = TATime[index] - burstTime[index];
      responsiveTime[index] = startTime[index] - arrivalTime[index];
    }

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

    for (let i = 0; i < n; i++) {
      let b = 'P' + (i + 1);
      this.table.push({
        name: b,
        ArrivalTime: arrivalTime[i],
        BurstTime: burstTime[i],
        CompilationTime: complitionTime[i],
        WT: waitingTime[i],
        TAT: TATime[i],
        ST: startTime[i],
        RT: responsiveTime[i],
      });
    }
    this.setData();
    let objtemp:any ={};
    objtemp['pid'] = "Pid";
      objtemp['time'] = processSequenceTime[0];
      this.final.push(objtemp);
    for (let i = 0; i < processSequence.length; i++) {
      let obj:any ={};
      obj['pid'] = processSequence[i];
      obj['time'] = processSequenceTime[i+1];
      this.final.push(obj);
    }
  }
  refresh() {
    window.location.reload();
  }
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
  getLoading() {
    // Add event listener here

    const button = document.getElementById('fullscreen-button');

    button?.addEventListener('click', function handleClick(event) {
      const loadingElement = document.createElement('div');
      loadingElement.innerHTML =
        '<div id="ani" style="position: absolute;top: 0%;width: 100%;background: black;opacity: 0.6;z-index: 100;height: 100%;"class="d-flex justify-content-center"><div style="position:absolute;top:50%;height:85px;width:85px" class="spinner-border" role="status"><span class="sr-only"></span></div></div>';
      loadingElement.id = 'loading-animation';
      loadingElement
        .querySelector('.loading-spinner')
        ?.classList.add('loading-spinner-style');
      document.body.appendChild(loadingElement);
    });
  }
}
