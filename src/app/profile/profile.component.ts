import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../common.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [NgbDatepickerConfig]
})
export class ProfileComponent implements OnInit {

    id: string;
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    birthday: any;
    age: number;
    sex: string;
    education: string;
    country: string;
    state: string;
    address: string;
    aboutme: string;

    model: NgbDateStruct;
    today: NgbDateStruct;

    closeResult: string;

    constructor(
        private commonService: CommonService,
        private modalService: NgbModal,
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
        user.username = this.username;
        this.commonService.updateUser(user).subscribe(
            data => {
                console.log(data);
            }, 
            error => this.errorMessage = error
        )
    }

    resetPassword = function(password) {
        this.commonService.resetPassword({ username: this.username, password: password.password1 }).subscribe(
            data => {
                console.log("reset successfully");
            },
            error => this.errorMessage = error
        )
    }

    openModal(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
}
