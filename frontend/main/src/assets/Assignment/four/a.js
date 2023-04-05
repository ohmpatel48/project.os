//   $(document).ready(function () {
//     com = [];
//     faults = [];
//     flag = 0;
//     $("#btn1").click(function () {
       
//     });

//     var btn = document.querySelector(".submit");

//     btn.addEventListener("click", function () {
//         // document.querySelector("#carouselExampleIndicators").classList.remove("d-none");
//         // document.querySelector("#carouselExampleIndicators").innerHTML=document.querySelector(".hidden2").innerHTML;

//         var frames = document.querySelector("#frames");
//         console.log(frames.value);

//         var str = document.querySelector("#istring");
//         console.log(str.value);

//         var inner = document.querySelector(".container-contact100");

//         var ol = document.querySelector("ol");

//         com = parseInt(frames.value);
//         console.log(com);

//         var pages = str.value.split(" ");

//         var n = pages.length;

//         faults = [];

//         // for(k=0;k<com.length;k++){
//         //     var li=document.createElement("li");
//         //     if(k==0){
//         //         li.classList.add("active");
//         //     }
//         //     li.setAttribute("data-target","#carouselExampleIndicators");
//         //     li.setAttribute("data-slide-to",k);
//         //     ol.appendChild(li);
//         // }

//         // for(var k=0;k<com.length;k++){
//         var m = parseInt(com, 10);
//         console.log(m);
//         var item = document.createElement("div");
//         // item.classList.add("carousel-item");
//         // if(k==0){
//         //     item.classList.add("active");
//         // }
//         inner.appendChild(item);
//         var ul = document.createElement("ul");
//         ul.innerHTML = "<h5>Summary</h5>";
//         item.appendChild(ul);
//         var li = document.createElement("li");
//         li.textContent = "Total frames: " + com;
//         ul.appendChild(li);
//         var li = document.createElement("li");
//         li.textContent = "Algorithm: LRU";
//         ul.appendChild(li);
//         var li = document.createElement("li");
//         li.textContent = "Total number of input frames: " + pages.length;
//         ul.appendChild(li);
//         var li = document.createElement("li");
//         li.textContent = "Sequence of pages: " + str.value;
//         ul.appendChild(li);
//         var li = document.createElement("li");
//         li.textContent = "Does LRU suffer from Belady's Anomaly? No";
//         ul.appendChild(li);

//         var h = document.createElement("h5");
//         h.textContent = "Visualization";
//         item.appendChild(h);

//         var hh = document.createElement("h6");
//         hh.textContent = "For No. of Frames = " + m;
//         item.appendChild(hh);

//         var tab = document.createElement("table");
//         item.appendChild(tab);
//         var col = document.createElement("tr");
//         tab.appendChild(col);
//         var head = document.createElement("td");
//         head.innerHTML = "<strong>No.</strong>";
//         head.classList.add("tbl-header");
//         col.appendChild(head);
//         var head = document.createElement("td");
//         head.innerHTML = "<strong>Page</strong>";
//         head.classList.add("tbl-header");
//         col.appendChild(head);

//         for (var i = 0; i < com; i++) {
//             var head = document.createElement("td");
//             head.innerHTML = "<strong>Frame</strong>";
//             head.classList.add("tbl-header");
//             col.appendChild(head);
//         }
//         var head = document.createElement("td");
//         head.innerHTML = "<strong>Hit</strong>";
//         head.classList.add("tbl-header");
//         col.appendChild(head);
//         var head = document.createElement("td");
//         head.innerHTML = "<strong>Replaced Page</strong>";
//         head.classList.add("tbl-header");
//         col.appendChild(head);



//         const inst = [];
//         var hits = 0;
//         var miss = 0;

//         for (var i = 0; i < n; i++) {
//             var hit = 0, v = "-";
//             var col = document.createElement("tr");
//             tab.appendChild(col);
//             var head = document.createElement("td");
//             head.textContent = i+1;
//             col.appendChild(head);
//             var head = document.createElement("td");
//             head.textContent = pages[i];
//             col.appendChild(head);
//             var idx = inst.indexOf(pages[i]);
//             if (idx == -1) {
//                 if (inst.length < m) {
//                     // inst.push(pages[i]);
//                     inst.unshift(pages[i]);
//                 }
//                 else {
                    
//                     v= inst[0];
//                     inst.splice(0,1);
//                     inst.unshift(pages[i]);

//                 }
//                 miss++;
//             }
//             else {
               
//                 inst.splice(inst.indexOf(pages[i]), 1);
//                 inst.unshift(pages[i]);
//                 hit = 1;
//                 hits++;
//             }
//             for (var j = inst.length - 1; j >= 0; j--) {
//                 var head = document.createElement("td");
//                 head.textContent = inst[j];
//                 if (j == inst.length - 1 && hit == 0) {
//                     head.style.background = "#ff1a1a";
//                 }
//                 else if (j == inst.length - 1 && hit == 1) {
//                     head.style.background = "#009900";
//                 }
//                 col.appendChild(head);
//             }
//             for (var j = 0; j < m - inst.length; j++) {
//                 var head = document.createElement("td");
//                 head.textContent = "-";
//                 col.appendChild(head);
//             }
//             var head = document.createElement("td");
//             if (hit == 1) {
//                 head.textContent = "Yes";
//             }
//             else {
//                 head.textContent = "No";
//             }
//             col.appendChild(head);
//             var head = document.createElement("td");
//             head.textContent = v;
//             col.appendChild(head);
//         }
//         var ul = document.createElement("ul");
//         ul.innerHTML = "<h5>Observations</h5>";
//         item.appendChild(ul);
//         var li = document.createElement("li");
//         li.textContent = "Total references: " + n;
//         ul.appendChild(li);

//         var li = document.createElement("li");
//         li.textContent = "Number of hits: " + hits;
//         ul.appendChild(li);
//         var li = document.createElement("li");
//         li.textContent = "Number of faults: " + miss;
//         faults.push(miss);
//         ul.appendChild(li);
//         var li = document.createElement("li");
//         li.textContent = "Hit rate: " + hits + "/" + n + " = " + (hits / n) * 100 + "%";
//         ul.appendChild(li);
//         var li = document.createElement("li");
//         li.textContent = "Fault rate: " + miss + "/" + n + " = " + (miss / n) * 100 + "%";
//         ul.appendChild(li);
        

//     });
// });
// }
