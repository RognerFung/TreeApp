import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../_services/common.service';

@Component({
    selector: 'app-flowchart',
    templateUrl: './flowchart.component.html',
    styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent implements OnInit {

    @Input() careerNo: string;

    careers: any;
    width: number = 130;//矩形单元宽度
    height: number = 60;//矩形单元高度
    xPoint: number = 0;//起始点x坐标
    yPoint: number = 0;//起始点y坐标
    xDistance: number = 150;//x方向两矩形单元间隔距离
    yDistance: number = 120;//y方向两矩形单元间隔距离
    rx: number = 5;//矩型圆角
    ry: number = 5;//矩型圆角
    maxLetter: number = 7;//每行最大字数
    letterHeight: number = 10;//字体高度
    letterSpace: number = 5;//字体与边缘间隔
    letterTimer: number = 13;//调节字体长度与间隔的倍数
    letterAdder: number = 2;//调节字体长度与间隔的加数

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
                data: { No: this.careerNo }
            }).subscribe(
            data => {
                this.careers = data;
                this.careers.forEach(element => {
                    if (element.CName !== undefined) {
                        var svgWidth: number = 1000;
                        element.Sub.forEach( x => {
                            if ((x.Sub.length + 2) * this.xDistance > svgWidth) {
                                svgWidth = (x.Sub.length + 2) * this.xDistance;
                            }
                        });
                        element.viewbox = "0 0 " + svgWidth + " " + ((element.Sub.length + 1) * this.yDistance * 2).toString();
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
                        if (element.CName.length <= this.maxLetter) {
                            var tLength1: number = (element.CName.length + this.letterAdder) * this.letterTimer;
                            element.textLength1 = (tLength1).toString();
                            element.tx1 = (this.xPoint + (this.width - tLength1) / 2).toString();
                            element.ty1 = (this.yPoint + this.height / 2 + this.letterSpace).toString();
                            element.text1 = element.CName;
                        } else if (element.CName.length <= this.maxLetter * 2) {
                            var t1Length: number = (Math.ceil(element.CName.length) / 2 + this.letterAdder) * this.letterTimer;
                            var t2Length: number = (Math.floor(element.CName.length) / 2 + this.letterAdder) * this.letterTimer;
                            element.textLength1 = (t1Length).toString();
                            element.textLength2 = (t2Length).toString();
                            element.tx1 = (this.xPoint + (this.width - t1Length) / 2).toString();
                            element.ty1 = (this.yPoint + this.height / 2 - this.letterSpace).toString();
                            element.text1 = element.CName.slice(0, Math.ceil(element.CName.length / 2));
                            element.tx2 = (this.xPoint + (this.width - t2Length) / 2).toString();
                            element.ty2 = (this.yPoint + this.height / 2 + this.letterHeight + this.letterSpace).toString();
                            element.text2 = element.CName.slice(- Math.floor(element.CName.length / 2));
                        } else {
                            var t1Length: number = (Math.ceil(element.CName.length / 3) + this.letterAdder) * this.letterTimer;
                            var t2Length: number = (Math.ceil((element.CName.length - Math.ceil(element.CName.length / 3)) / 2) + this.letterAdder) * this.letterTimer;
                            var t3Length: number = (Math.floor(element.CName.length / 3) + this.letterAdder) * this.letterTimer;
                            element.textLength1 = (t1Length).toString();
                            element.textLength2 = (t2Length).toString();
                            element.textLength3 = (t3Length).toString();
                            element.tx1 = (this.xPoint + (this.width - t1Length) / 2).toString();
                            element.ty1 = (this.yPoint + this.letterHeight + this.letterSpace).toString();
                            element.text1 = element.CName.slice(0, Math.ceil(element.CName.length / 3));
                            element.tx2 = (this.xPoint + (this.width - t2Length) / 2).toString();
                            element.ty2 = (this.yPoint + this.height / 2 + this.letterSpace).toString();
                            element.text2 = element.CName.slice(Math.floor(element.CName.length / 3), - Math.floor(element.CName.length / 3));
                            element.tx3 = (this.xPoint + (this.width - t3Length) / 2).toString();
                            element.ty3 = (this.yPoint + this.height - this.letterSpace).toString();
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
                            if (ele.CName.length <= this.maxLetter) {
                                var tt1Length: number = (ele.CName.length + this.letterAdder) * this.letterTimer;
                                ele.textLength1 = (tt1Length).toString();
                                ele.tx1 = (this.xPoint + this.xDistance + (this.width - tt1Length) / 2).toString();
                                ele.ty1 = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 + this.letterSpace).toString();
                                ele.text1 = ele.CName;
                            } else if (ele.CName.length <= this.maxLetter * 2) {
                                var tt1Length: number = (Math.ceil(ele.CName.length) / 2 + this.letterAdder) * this.letterTimer;
                                var tt2Length: number = (Math.floor(ele.CName.length) / 2 + this.letterAdder) * this.letterTimer;
                                ele.textLength1 = (tt1Length).toString();
                                ele.textLength2 = (tt2Length).toString();
                                ele.tx1 = (this.xPoint  + this.xDistance + (this.width - tt1Length) / 2).toString();
                                ele.ty1 = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 - this.letterSpace).toString();
                                ele.text1 = ele.CName.slice(0, Math.ceil(ele.CName.length / 2));
                                ele.tx2 = (this.xPoint  + this.xDistance + (this.width - tt2Length) / 2).toString();
                                ele.ty2 = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 + this.letterHeight + this.letterSpace).toString();
                                ele.text2 = ele.CName.slice(- Math.floor(ele.CName.length / 2));
                            } else {
                                var tt1Length: number = (Math.ceil(ele.CName.length / 3) + this.letterAdder) * this.letterTimer;
                                var tt2Length: number = (Math.ceil((ele.CName.length - Math.ceil(ele.CName.length / 3)) / 2) + this.letterAdder) * this.letterTimer;
                                var tt3Length: number = (Math.floor(ele.CName.length / 3) + this.letterAdder) * this.letterTimer;
                                ele.tx1 = (this.xPoint  + this.xDistance + (this.width - tt1Length) / 2).toString();
                                ele.ty1 = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele) + this.letterHeight + this.letterSpace).toString();
                                ele.text1 = ele.CName.slice(0, Math.ceil(ele.CName.length / 3));
                                ele.tx2 = (this.xPoint  + this.xDistance + (this.width - tt2Length) / 2).toString();
                                ele.ty2 = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 + this.letterSpace).toString();
                                ele.text2 = ele.CName.slice(Math.ceil(ele.CName.length / 3), - Math.floor(ele.CName.length / 3));
                                ele.tx3 = (this.xPoint  + this.xDistance + (this.width - tt3Length) / 2).toString();
                                ele.ty3 = (this.yPoint + this.yDistance + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height - this.letterSpace).toString();
                                ele.text3 = ele.CName.slice(- Math.floor(ele.CName.length / 3));
                            }
                        }
                        ele.Sub.forEach(e => {
                            if (e.CName !== undefined) {
                                e.in = ele.No;
                                e.out = null;
                                e.width = this.width.toString();
                                e.height = this.height.toString();
                                e.x = (this.xPoint + this.xDistance * 2 + this.xDistance * ele.Sub.indexOf(e)).toString();
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
                                if (e.CName.length <= this.maxLetter) {
                                    var ttt1Length: number = (e.CName.length + this.letterAdder) * this.letterTimer;
                                    e.textLength1 = (ttt1Length).toString();
                                    e.tx1 = (this.xPoint + this.xDistance * 2 + this.xDistance * ele.Sub.indexOf(e) + (this.width - ttt1Length) / 2).toString();
                                    e.ty1 = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 + 5).toString();
                                    e.text1 = e.CName;
                                } else if (e.CName.length <= this.maxLetter * 2) {
                                    var ttt1Length: number = (Math.ceil(e.CName.length) / 2 + this.letterAdder) * this.letterTimer;
                                    var ttt2Length: number = (Math.floor(e.CName.length) / 2 + this.letterAdder) * this.letterTimer;
                                    e.textLength1 = (ttt1Length).toString();
                                    e.textLength2 = (ttt2Length).toString();
                                    e.tx1 = (this.xPoint + this.xDistance * 2 + this.xDistance * ele.Sub.indexOf(e) + (this.width - ttt1Length) / 2).toString();
                                    e.ty1 = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 - this.letterSpace).toString();
                                    e.text1 = e.CName.slice(0, Math.ceil(e.CName.length / 2));
                                    e.tx2 = (this.xPoint + this.xDistance * 2 + this.xDistance * ele.Sub.indexOf(e) + (this.width - ttt2Length) / 2).toString();
                                    e.ty2 = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 + this.letterHeight + this.letterSpace).toString();
                                    e.text2 = e.CName.slice(- Math.floor(e.CName.length / 2));
                                } else {
                                    var ttt1Length: number = (Math.ceil(e.CName.length / 3) + this.letterAdder) * this.letterTimer;
                                    var ttt2Length: number = (Math.ceil((e.CName.length - Math.ceil(e.CName.length / 3)) / 2) + this.letterAdder) * this.letterTimer;
                                    var ttt3Length: number = (Math.floor(e.CName.length / 3) + this.letterAdder) * this.letterTimer;
                                    e.tx1 = (this.xPoint + this.xDistance * 2 + this.xDistance * ele.Sub.indexOf(e) + (this.width - ttt1Length) / 2).toString();
                                    e.ty1 = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele) + this.letterHeight + this.letterSpace).toString();
                                    e.text1 = e.CName.slice(0, Math.ceil(e.CName.length / 3));
                                    e.tx2 = (this.xPoint + this.xDistance * 2 + this.xDistance * ele.Sub.indexOf(e) + (this.width - ttt2Length) / 2).toString();
                                    e.ty2 = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height / 2 + this.letterSpace).toString();
                                    e.text2 = e.CName.slice(Math.ceil(e.CName.length / 3), - Math.floor(e.CName.length / 3));
                                    e.tx3 = (this.xPoint + this.xDistance * 2 + this.xDistance * ele.Sub.indexOf(e) + (this.width - ttt3Length) / 2).toString();
                                    e.ty3 = (this.yPoint + this.yDistance * 2 + this.yDistance * 2 * element.Sub.indexOf(ele) + this.height - this.letterSpace).toString();
                                    e.text3 = e.CName.slice(- Math.floor(e.CName.length / 3));
                                }
                            }
                        });
                    });
                });
            }, 
            error => this.errorMessage = error
        );
    };
}