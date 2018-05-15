import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    username: string;

    constructor(
        private commonService : CommonService,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit() {
    }

    checkLogin = function () {
        this.commonService.checkLogin().subscribe(
            data => {
                if (data) {
                    this.username = data.data;
                    console.log(data.data);
                    this.messageService.changeUser(this.username);
                } else {
                    this.username = 'guest';
                    console.log('guest');
                }
            },
            error => this.errorMessage = error
        );
    }

    verifyUser = function(user) {
        this.commonService.verifyUser(user).subscribe(
            data => {
                if (data) {
                    console.log('登录成功');
                    this.router.navigateByUrl('/tree');
                    this.checkLogin();
                } else {
                    console.log('用户名与密码不符');
                }
            }, error => this.errorMessage = error
        );
    }
}