import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-early-education',
    templateUrl: './early-education.component.html',
    styleUrls: ['./early-education.component.css']
})
export class EarlyEducationComponent implements OnInit {

    earlyEdu: any = {};
    ages: string[] = [ 
        "2 Months",
        "4 Months",
        "6 Months",
        "9 Months",
        "1 Year",
        "18 Months",
        "2 Years",
        "3 Years",
        "4 Years",
        "5 Years"
    ];

    constructor(
        private commonService: CommonService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.loadEdu();
    }

    loadEdu = function (age = this.age) {
        var d = {};
        if (age !== "all") {
            d = { age: age };
        }
        this.commonService.modifyEarlyedu(
            {
                order: "select",
                data: d
            }).subscribe(
            data => {
                this.earlyEdu = data[0];
                this.earlyEdu.img = "assets/earlyedu/" + this.earlyEdu.age + ".png";
            }, 
            error => this.errorMessage = error
        );
    };

    fourColor = (field) => {
        switch(field) {
            case("Social/Emotion"): return "#28a745";
            case("Language/Communication"): return "#ffc107";
            case("Cognitive/Learning"): return "#17a2b8";
            case("Physical/Movement"): return "#dc3545";
        }
    };

    check(Cfield, cn) {
        var selected = this.earlyEdu.content.find(f => {
            return f.Cfield === Cfield;
        }).content.find(e => {
            return e.cn === cn;
        });
        selected.score = selected.score === 0 ? 1 : 0;
    };

    open(content: any, array: any) {
        var len = array.reduce((t, c) => { 
            return t > c.length ? t : c.length;
        });
        var size;
        if (len > 24) {
            size = "lg";
        } else if (len > 12) {
            size = "";
        } else {
            size = "sm";
        }
        this.modalService.open(content, { size: size });
    }
}
