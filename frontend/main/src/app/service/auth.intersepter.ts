import { HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SetdatarrService } from "./setdataarr.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor (private login:SetdatarrService) { }
  intercept(req: any, next: any) {

    let newreq = req;
    let token = this.login.gettoken();

    if (token  != null) {
        newreq = newreq.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
    }

    return next.handle(newreq);
  }
}