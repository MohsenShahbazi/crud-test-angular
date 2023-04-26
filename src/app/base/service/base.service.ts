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

  add(item: any, itemType: string): void {
    let lstItems: any[] = JSON.parse(localStorage.getItem(itemType) ?? '');
    lstItems.push(item);
    localStorage.setItem(itemType, JSON.stringify(lstItems));
  }

  update(oldItem: any, newItem: any, itemType: string) {
    this.delete(oldItem, itemType);
    this.add(newItem, itemType);
  }

  delete(item: any, itemType: string) {
    let lstItems: any[] = JSON.parse(localStorage.getItem(itemType) ?? '');

    for (let i = 0; i < lstItems.length; i++) {
      if (lstItems[i].bankAccountNumber == +item.bankAccountNumber) {
        lstItems.splice(i, 1);
        break;
      }
    }
    localStorage.setItem(itemType, JSON.stringify(item));
  }

  get(bankAccountNumber: string, itemType: string): any {
    let lstItems: any[] = JSON.parse(localStorage.getItem(itemType) ?? '');
    return _.find(lstItems, function (item: any) {
      item['bankAccountNumber'] == bankAccountNumber;
    })
  }

  getAll(itemType: string): any {
    let lstItems: any[] = JSON.parse(localStorage.getItem(itemType) ?? '');
    return lstItems;
  }
}
