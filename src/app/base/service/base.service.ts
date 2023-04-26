import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from "../../model/customer";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {
  }


  rout: string = '';
  itemType: string = '';

  add(item: any): void {
    let lstItems: any[] = JSON.parse(localStorage.getItem(this.itemType) ?? '');
    lstItems.push(item);
    localStorage.setItem(this.itemType, JSON.stringify(lstItems));
  }

  update(oldItem: any, newItem: any) {
    this.delete(oldItem);
    this.add(newItem);
  }

  delete(item: any) {
    let lstItems: any[] = JSON.parse(localStorage.getItem(this.itemType) ?? '');

    for (let i = 0; i < lstItems.length; i++) {
      if (lstItems[i].bankAccountNumber == +item.bankAccountNumber) {
        lstItems.splice(i, 1);
        break;
      }
    }
    localStorage.setItem(this.itemType, JSON.stringify(item));
  }

  get(bankAccountNumber: string): any {
    let lstItems: any[] = JSON.parse(localStorage.getItem(this.itemType) ?? '');
    return _.find(lstItems, function (item: any) {
      item['bankAccountNumber'] == bankAccountNumber;
    })
  }

  getAll(): any {
    let lstItems: any[] = JSON.parse(localStorage.getItem(this.itemType) ?? '');
    return lstItems;
  }
}
