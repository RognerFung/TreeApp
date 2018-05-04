import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonService {

  constructor(private http: Http) { }
  
  regUser(user){
    return this.http.post('http://localhost:3333/api/regUser/', user, {
      withCredentials: true
    }).map((response: Response) => response.json());
  }
  
  getBranches(){
    return this.http.get('http://localhost:3333/api/getBranches/', {
      withCredentials: true
    }).map((response: Response) => response.json());
  }

  verifyUsername(user){
    return this.http.post('http://localhost:3333/api/verifyUsername/', user, {
      withCredentials: true
    }).map((response: Response) => response.json());
  }

  verifyUser(user){
    return this.http.post('http://localhost:3333/api/verifyUser/', user, {
      withCredentials: true
    }).map((response: Response) => response.json());
  }

  checkLogin() {
    return this.http.get('http://localhost:3333/api/checkLogin/', {
      withCredentials: true
    }).map((response: Response) => response.json());
  }
}  