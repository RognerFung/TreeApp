import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    jobs: any[];
    careers: any[];

    constructor(
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.loadAllCareers();
    }

    loadAllCareers = function () {
        console.log("yes");
        this.commonService.modifyCareer(
            {
                order: "select",
                data: {}
            }).subscribe(
            data => {
                this.careers = data;
                console.log(data);
            }, 
            error => this.errorMessage = error
        );
    };

    //condition: {"No": "111"}
    loadJobs = function (condition) {
        this.commonService.modifyJob(
            {
                order: "select",
                data: condition
            }).subscribe(
            data => {
                this.jobs = data;
                console.log(data);
            }, 
            error => this.errorMessage = error
        );
    };
    
}
