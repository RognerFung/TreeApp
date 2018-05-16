import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../common.service';

const now = new Date();

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [NgbDatepickerConfig]
})
export class ProfileComponent implements OnInit {

    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    birthday: string;
    age: number;
    sex: string;
    education: string;
    country: string;
    state: string;
    address: string;
    aboutme: string;

    model: NgbDateStruct;
    today: NgbDateStruct;

    constructor(
        private commonService: CommonService,
        private config: NgbDatepickerConfig
    ) {
        config.minDate = { year: 1900, month: 1, day: 1} ;
        config.maxDate = { year: 2018, month: 12, day: 31 };
        config.outsideDays = 'hidden';
    }
  

    ngOnInit() {
        this.checkLogin();
        this.selectToday();
    }

    checkLogin = function () {
        this.commonService.checkLogin().subscribe(
            data => {
                if (data) {
                    this.username = data.data;
                } else {
                    this.username = 'guest';
                }
            },
            error => this.errorMessage = error
        );
    }

    selectToday() {
        this.today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    }

    updateUser = function (user) {
        console.log(user);
        // this.commonService.updateUser(user).subscribe(
        //     data => {
        //         console.log(data);
        //     }, 
        //     error => this.errorMessage = error
        // )
    }
}
