import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SetdatarrService {

  constructor(
    private http: HttpClient
  ) { }

  public saverr(table:any[]){
    console.log(table);
    return this.http.post(`${baseurl}/roundrobin/`,table);
  }
  public savescan(table:any){
    console.log(table);
    return this.http.post(`${baseurl}/scan/`,table);
  }
  public savecscan(table:any){
    console.log(table);
    return this.http.post(`${baseurl}/cscan/`,table);
  }
  public savebanker(table:any[]){
    console.log(table);
    return this.http.post(`${baseurl}/banker/`,table);
  }
  public savemru(table:any){
    console.log(table);
    return this.http.post(`${baseurl}/mru/`,table);
  }
}
