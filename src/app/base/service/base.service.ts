import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {
  }


  rout: string = '';

  add(model: any): void {
    //localStorage.setItem(model);
  }

  update(model: any) {
    return this.http.post(this.rout + 'update', model, {});
  }

  delete(id: number) {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http.post(this.rout + 'delete', {}, {params: params});
  }

  get(value: string): any {
    return localStorage.getItem(value);
  }


  getList(value: string) {
    return localStorage.getItem(value);
  }
}
