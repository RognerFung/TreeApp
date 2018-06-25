import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { CommonService } from '../_services/common.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { MessageService } from '../_services/message.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    username: string;
    loginFail: boolean = false;

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
                    this.messageService.changeUser(this.username);
                } else {
                    this.username = 'guest';
                }
            },
            error => this.errorMessage = error
        );
    }

    verifyUser = function(user) {
        this.commonService.verifyUser(user).subscribe(
            data => {
                if (data) {
                    this.router.navigateByUrl('/tree');
                    this.checkLogin();
                } else {
                    this.loginFail = true;
                }
            }, error => this.errorMessage = error
        );
    }
}