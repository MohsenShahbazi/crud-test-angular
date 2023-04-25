import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {
  }


  rout: string = '';

  add(model: any): any {
    return this.http.post(this.rout + 'add', model, {});
  }

  update(model: any) {
    return this.http.post(this.rout + 'update', model, {});
  }

  delete(id: number) {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http.post(this.rout + 'delete', {}, {params: params});
  }

  get(id: number): any {
    let params = new HttpParams().set('id', id);
    return this.http.post(this.rout + 'get', {}, {params: params});
  }


  getList() {
    return this.http.post(this.rout + 'getList', {}, {});
  }
}
