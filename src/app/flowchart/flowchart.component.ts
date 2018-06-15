import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
    selector: 'app-flowchart',
    templateUrl: './flowchart.component.html',
    styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent implements OnInit {

    careers: any;
    width: number = 100;
    height: number = 60;
    xPoint: number = 0;
    yPoint: number = 0;
    xDistance: number = 120;
    yDistance: number = 120;
    rx: number = 5;
    ry: number = 5;

    constructor(
        private commonService: CommonService
    ) { }

    ngOnInit() {
        this.loadCareers();
    }

    loadCareers = function () {
        this.commonService.modifyCareer(
            {
                order: "select",
                data: {}
            }).subscribe(
            data => {
                this.careers = data;
                this.careers.forEach(element => {
                    if (element.CName !== undefined) {
                        element.viewbox = "0 0 1200 " + ((element.Sub.length + 1) * this.yDistance * 2).toString();
                        element.in = null;
                        element.out = element.No;
                        element.width = this.width.toString();
                        element.height = this.height.toString();
                        element.x = this.xPoint.toString();
                        element.y = this.yPoint.toString();
                        element.rx = this.rx.toString();
                        element.ry = this.ry.toString();
                        element.startA = {
                            x: (this.xPoint + this.width / 2).toString(),
                            y: (this.yPoint+ this.height).toString()
                        };
                        element.endA = {
                            x: (this.xPoint + this.width / 2).toString(),
                            y: (this.yPoint + this.yDistance + this.height / 2 + (element.Sub.length - 1) * this.yDistance * 2).toString()
                        };
                        if (element.CName.length < 7) {
                            var tLength1: number = element.CName.length === 6 ? 96 : element.CName.length * 10 + 30;
                            element.textLength1 = (tLength1).toString();
                            element.tx1 = (this.xPoint + (this.width - tLength1) / 2).toString();
                            element.ty1 = (this.yPoint + this.height / 2 + 5).toString();
                            element.text1 = element.CName;
                        } else if (element.CName.length < 13) {
                            var t1Length: number = Math.ceil(element.CName.length / 2) === 6 ? 96 : Math.ceil(element.CName.length / 2) * 10 + 30;
                            var t2Length: number = Math.floor(element.CName.length / 2) === 6 ? 96 : Math.floor(element.CName.length / 2) * 10 + 30;
                            element.textLength1 = (t1Length).toString();
                            element.textLength2 = (t2Length).toString();
                            element.tx1 = (this.xPoint + (this.width - t1Length) / 2).toString();
                            element.ty1 = (this.yPoint + this.height / 2 - 8).toString();
                            element.text1 = element.CName.slice(0, Math.ceil(element.CName.length / 2));
                            element.tx2 = (this.xPoint + (this.width - t2Length) / 2).toString();
                            element.ty2 = (this.yPoint + this.height - 12).toString();
                            element.text2 = element.CName.slice(- Math.floor(element.CName.length / 2));
                        } else {
                            var t1Length: number = Math.ceil(element.CName.length / 3) === 6 ? 96 : Math.ceil(element.CName.length / 3) * 10 + 30;
                            var t2Length: number = Math.ceil((element.CName.length - Math.ceil(element.CName.length / 3)) / 2) === 6 ? 96 : Math.ceil((element.CName.length - Math.ceil(element.CName.length / 3)) / 2) * 10 + 30;
                            var t3Length: number = Math.floor(element.CName.length / 3) === 6 ? 96 : Math.floor(element.CName.length / 3) * 10 + 30;
                            element.textLength1 = (t1Length).toString();
                            element.textLength2 = (t2Length).toString();
                            element.textLength3 = (t3Length).toString();
                            element.tx1 = (this.xPoint + (this.width - t1Length) / 2).toString();
                            element.ty1 = (this.yPoint + this.height / 2 - 15).toString();
                            element.text1 = element.CName.slice(0, Math.ceil(element.CName.length / 3));
                            element.tx2 = (this.xPoint + (this.width - t2Length) / 2).toString();
                            element.ty2 = (this.yPoint + this.height / 2 + 5).toString();
                            element.text2 = element.CName.slice(Math.floor(element.CName.length / 3), - Math.floor(element.CName.length / 3));
                            element.tx3 = (this.xPoint + (this.width - t3Length) / 2).toString();
                            element.ty3 = (this.yPoint + this.height - 5).toString();
                            element.text3 = element.CName.slice(- Math.floor(element.CName.length / 3));
                        }
                    }
                    element.Sub.forEach(ele => {
                        if (ele.CName !== undefined) {
                            ele.in = element.No;
                            ele.out = ele.No;
                            ele.width = this.width.toString();
                            ele.height = this.height.toString();
                            ele.x = (this.xPoint + this.xDistance).toString();
                            ele.y = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele)).toString();
                            ele.rx = this.rx.toString();
                            ele.ry = this.ry.toString();
                            ele.startA = {
                                x: (this.xPoint + this.xDistance).toString(),
                                y: (this.yPoint + this.yDistance + this.height / 2 + this.yDistance * 2 * element.Sub.indexOf(ele)).toString()
                            };
                            ele.endA = {
                                x: (this.xPoint + this.width / 2).toString(),
                                y: (this.yPoint + this.yDistance + this.height / 2 + this.yDistance * 2 * element.Sub.indexOf(ele)).toString()
                            };
                            ele.startB = {
                                x: (this.xPoint + this.xDistance + this.width).toString(),
                                y: (this.yPoint + this.yDistance + this.height / 2 + this.yDistance * 2 * element.Sub.indexOf(ele)).toString()
                            };
                            ele.endB = {
                                x: (this.xPoint + this.xDistance + this.width / 2 + this.xDistance * ele.Sub.length).toString(),
                                y: (this.yPoint + this.yDistance + this.height / 2 + this.yDistance * 2 * element.Sub.indexOf(ele)).toString()
                            };
                            if (ele.CName.length < 7) {
                                var tt1Length: number = ele.CName.length === 6 ? 96 : ele.CName.length * 10 + 30;
                                ele.textLength1 = (tt1Length).toString();
                                ele.tx1 = (this.xPoint + this.xDistance + (this.width - tt1Length) / 2).toString();
                                ele.ty1 = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 + 5).toString();
                                ele.text1 = ele.CName;
                            } else if (ele.CName.length < 13) {
                                var tt1Length: number = Math.ceil(ele.CName.length / 2) === 6 ? 96 : Math.ceil(ele.CName.length / 2) * 10 + 30;
                                var tt2Length: number = Math.floor(ele.CName.length / 2) === 6 ? 96 : Math.floor(ele.CName.length / 2) * 10 + 30;
                                ele.textLength1 = (tt1Length).toString();
                                ele.textLength2 = (tt2Length).toString();
                                ele.tx1 = (this.xPoint  + this.xDistance + (this.width - tt1Length) / 2).toString();
                                ele.ty1 = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 - 8).toString();
                                ele.text1 = ele.CName.slice(0, Math.ceil(ele.CName.length / 2));
                                ele.tx2 = (this.xPoint  + this.xDistance + (this.width - tt2Length) / 2).toString();
                                ele.ty2 = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height - 12).toString();
                                ele.text2 = ele.CName.slice(- Math.floor(ele.CName.length / 2));
                            } else {
                                var tt1Length: number = Math.ceil(ele.CName.length / 3) === 6 ? 96 : Math.ceil(ele.CName.length / 3) * 10 + 30;
                                var tt2Length: number = Math.ceil((ele.CName.length - Math.ceil(ele.CName.length / 3)) / 2) === 6 ? 96 : Math.ceil((ele.CName.length - Math.ceil(ele.CName.length / 3)) / 2) * 10 + 30;
                                var tt3Length: number = Math.floor(ele.CName.length / 3) === 6 ? 96 : Math.floor(ele.CName.length / 3) * 10 + 30;
                                ele.tx1 = (this.xPoint  + this.xDistance + (this.width - tt1Length) / 2).toString();
                                ele.ty1 = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 - 15).toString();
                                ele.text1 = ele.CName.slice(0, Math.ceil(ele.CName.length / 3));
                                ele.tx2 = (this.xPoint  + this.xDistance + (this.width - tt2Length) / 2).toString();
                                ele.ty2 = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 + 5).toString();
                                ele.text2 = ele.CName.slice(Math.ceil(ele.CName.length / 3), - Math.floor(ele.CName.length / 3));
                                ele.tx3 = (this.xPoint  + this.xDistance + (this.width - tt3Length) / 2).toString();
                                ele.ty3 = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height - 5).toString();
                                ele.text3 = ele.CName.slice(- Math.floor(ele.CName.length / 3));
                            }
                        }
                        ele.Sub.forEach(e => {
                            if (e.CName !== undefined) {
                                e.in = ele.No;
                                e.out = null;
                                e.width = this.width.toString();
                                e.height = this.height.toString();
                                e.x = (this.xPoint + this.xDistance * 2 + this.yDistance * ele.Sub.indexOf(e)).toString();
                                e.y = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele)).toString();
                                e.rx = this.rx.toString();
                                e.ry = this.ry.toString();
                                e.startA = {
                                    x: (this.xPoint + this.xDistance * 2 + this.width / 2 + this.xDistance * ele.Sub.indexOf(e)).toString(),
                                    y: (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele)).toString()
                                };
                                e.endA = {
                                    x: (this.xPoint + this.xDistance * 2 + this.width / 2 + this.xDistance * ele.Sub.indexOf(e)).toString(),
                                    y: (this.yPoint + this.yDistance + this.height / 2 + this.yDistance * 2 * element.Sub.indexOf(ele)).toString()
                                };
                                if (e.CName.length < 7) {
                                    var ttt1Length: number = e.CName.length === 6 ? 96 : e.CName.length * 10 + 30;
                                    e.textLength1 = (ttt1Length).toString();
                                    e.tx1 = (this.xPoint + this.xDistance * 2 + this.yDistance * ele.Sub.indexOf(e) + (this.width - ttt1Length) / 2).toString();
                                    e.ty1 = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 + 5).toString();
                                    e.text1 = e.CName;
                                } else if (e.CName.length < 13) {
                                    var ttt1Length: number = Math.ceil(e.CName.length / 2) === 6 ? 96 : Math.ceil(e.CName.length / 2) * 10 + 30;
                                    var ttt2Length: number = Math.floor(e.CName.length / 2) === 6 ? 96 : Math.floor(e.CName.length / 2) * 10 + 30;
                                    e.textLength1 = (ttt1Length).toString();
                                    e.textLength2 = (ttt2Length).toString();
                                    e.tx1 = (this.xPoint + this.xDistance * 2 + this.yDistance * ele.Sub.indexOf(e) + (this.width - ttt1Length) / 2).toString();
                                    e.ty1 = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 - 8).toString();
                                    e.text1 = e.CName.slice(0, Math.ceil(e.CName.length / 2));
                                    e.tx2 = (this.xPoint + this.xDistance * 2 + this.yDistance * ele.Sub.indexOf(e) + (this.width - ttt2Length) / 2).toString();
                                    e.ty2 = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height - 12).toString();
                                    e.text2 = e.CName.slice(- Math.floor(e.CName.length / 2));
                                } else {
                                    var ttt1Length: number = Math.ceil(e.CName.length / 3) === 6 ? 96 : Math.ceil(e.CName.length / 3) * 10 + 30;
                                    var ttt2Length: number = Math.ceil((e.CName.length - Math.ceil(e.CName.length / 3)) / 2) === 6 ? 96 : Math.ceil((e.CName.length - Math.ceil(e.CName.length / 3)) / 2) * 10 + 30;
                                    var ttt3Length: number = Math.floor(e.CName.length / 3) === 6 ? 96 : Math.floor(e.CName.length / 3) * 10 + 30;
                                    e.tx1 = (this.xPoint + this.xDistance * 2 + this.yDistance * ele.Sub.indexOf(e) + (this.width - ttt1Length) / 2).toString();
                                    e.ty1 = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 - 15).toString();
                                    e.text1 = e.CName.slice(0, Math.ceil(e.CName.length / 3));
                                    e.tx2 = (this.xPoint + this.xDistance * 2 + this.yDistance * ele.Sub.indexOf(e) + (this.width - ttt2Length) / 2).toString();
                                    e.ty2 = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 + 5).toString();
                                    e.text2 = e.CName.slice(Math.ceil(e.CName.length / 3), - Math.floor(e.CName.length / 3));
                                    e.tx3 = (this.xPoint + this.xDistance * 2 + this.yDistance * ele.Sub.indexOf(e) + (this.width - ttt3Length) / 2).toString();
                                    e.ty3 = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height - 5).toString();
                                    e.text3 = e.CName.slice(- Math.floor(e.CName.length / 3));
                                }
                            }
                        });
                    });
                });
                console.log(this.careers);
            }, 
            error => this.errorMessage = error
        );
    };
}
