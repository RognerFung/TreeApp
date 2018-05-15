import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    username: string;

    constructor(
        private commonService: CommonService
    ) { }

    ngOnInit() {
        this.checkLogin();
    }

    checkLogin = function () {
        this.commonService.checkLogin().subscribe(
            data => {
                if (data) {
                    this.username = data.data;
                    console.log(data.data);
                } else {
                    this.username = 'guest';
                    console.log('guest');
                }
            },
            error => this.errorMessage = error
        );
    }
  
}
