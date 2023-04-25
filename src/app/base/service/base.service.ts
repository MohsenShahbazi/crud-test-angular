import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {
  }


  rout: string = '';

  add(item: any): void {
    localStorage.setItem('dataSource', JSON.stringify(item));
  }

  update(): void {
  }

  delete(item: string) {
    localStorage.removeItem(item);
  }

  get(item: string): any {
    return localStorage.getItem(item);
  }
}
