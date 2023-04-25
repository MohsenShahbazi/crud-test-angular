import { Injectable } from '@angular/core';
import {BaseService} from "../base/service/base.service";
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService{

  constructor(    http:HttpClient) {
    super(http);
    this.rout = 'customer';
  }


}
