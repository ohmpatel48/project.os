import { Component } from '@angular/core';
import { SetdatarrService } from 'src/app/service/setdataarr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private setdatarrService:SetdatarrService) { }
  public Email:any;
  public password:any;
  login(){
    let credientials = {
      email:this.Email,
      password:this.password
    }
    
    this.setdatarrService.dologin(credientials).subscribe(
      (res:any)=>{
        if(res.success){
          this.setdatarrService.LoginUser(res);
          console.log(res);
        }else{
          console.log(res);
        }
      },
      (err:any)=>{
        console.log(err);
      }
    )
  }
}
