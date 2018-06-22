import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    careers: any[];
    
    constructor(
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.loadAllCareers();
    }

    loadAllCareers = function () {
        this.commonService.modifyCareer(
            {
                order: "select",
                data: {}
            }).subscribe(
            data => {
                this.careers = data;
            }, 
            error => this.errorMessage = error
        );
    };
}
