import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    career: any = "none";

    constructor(
        private commonService: CommonService
    ) {}

    ngOnInit() {
    }

    modifyCareer = function () {
        console.log("yes");
        this.commonService.modifyCareer({order: "update", data: {"No": "121"}, new: {"Name": "Managers", "No": "1"}}).subscribe(
            data => {
                this.career = data;
                console.log(data);
            }, 
            error => this.errorMessage = error
        );
    }
    
}
