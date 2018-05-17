import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../common.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as COUNTRIES from '../userinfo.countries';
import * as EDUCATIONS from '../userinfo.educations';
import * as SEXES from '../userinfo.sexes';

const now = new Date();

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [NgbDatepickerConfig]
})
export class ProfileComponent implements OnInit {

    user: object;

    model: NgbDateStruct;
    today: NgbDateStruct;

    modalReference: NgbModalRef;
    closeResult: string;

    countries: Array<string> = COUNTRIES.COUNTRIES;
    sexes : Array<string> = SEXES.SEXES;
    educations: Array<string> = EDUCATIONS.EDUCATIONS;

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
        this.selectToday();
        this.getUsersInfo();
    }

    getUsersInfo = function () {
        this.commonService.getUsersInfo().subscribe(
            data => {
                if (data) {
                    console.log(data);
                    this.user = data;
                    if (this.user.birthday) {
                        var year = this.user.birthday.year.toString();
                        var month;
                        var day;
                        if (this.user.birthday.month < 10) {
                            month = '0' + this.user.birthday.month.toString();
                        } else {
                            month = this.user.birthday.month.toString();
                        }
                        if (this.user.birthday.day < 10) {
                            day = '0' + this.user.birthday.day.toString();
                        } else {
                            day = this.user.birthday.day.toString();
                        }
                        this.user.birthday = year + '-' + month + '-' + day;
                    }
                } else {
                    this.user = false;
                }
            },
            error => this.errorMessage = error
        );
    }

    selectToday() {
        this.today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    }

    updateUser = function (user) {
        user.username = this.user.username;
        this.commonService.updateUser(user).subscribe(
            data => {
                console.log(data);
            }, 
            error => this.errorMessage = error
        )
    }

    resetPassword = function(password) {
        this.closeModal();
        this.commonService.resetPassword({ username: this.user.username, password: password.password1 }).subscribe(
            data => {
                console.log("reset successfully");
            },
            error => this.errorMessage = error
        )
    }

    openModal(content) {
        this.modalReference = this.modalService.open(content);
        this.modalReference.result.then((result) => {
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

    closeModal() {
        this.modalReference.close();
    }

}
