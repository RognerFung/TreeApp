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

    updateUser(user){
        return this.http.post('http://localhost:3333/api/updateUser/', user, {
            withCredentials: true
        }).map((response: Response) => response.json());
    }

    verifyPassword(user){
        return this.http.post('http://localhost:3333/api/verifyPassword/', user, {
            withCredentials: true
        }).map((response: Response) => response.json());
    }

    resetPassword(password){
        return this.http.post('http://localhost:3333/api/resetPassword/', password, {
            withCredentials: true
        }).map((response: Response) => response.json());
    }

    checkLogin() {
        return this.http.get('http://localhost:3333/api/checkLogin/', {
            withCredentials: true
        }).map((response: Response) => response.json());
    }

    getUsersInfo() {
        return this.http.get('http://localhost:3333/api/getUsersInfo/', {
            withCredentials: true
        }).map((response: Response) => response.json());
    }

    signOut() {
        return this.http.get('http://localhost:3333/api/signOut', {
            withCredentials: true
        }).map((response: Response) => response.json());
    }
}  