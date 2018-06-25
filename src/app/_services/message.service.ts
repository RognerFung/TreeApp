import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {
    private username = new BehaviorSubject<string>('guest');
    cast = this.username.asObservable();
    constructor() { }

    changeUser(newUser: string) {
        this.username.next(newUser);
    }
 
    

}
