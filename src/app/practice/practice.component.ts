import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-practice',
    templateUrl: './practice.component.html',
    styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

    testTypes: any = [
        {
            name: "一位数加法",
            range: [9, 9],
            operators: ["+"]
        },
        {
            name: "一位数减法",
            range: [9, 9],
            operators: ["-"]
        },
        {
            name: "一位数加减法",
            range: [9, 9],
            operators: ["+", "-"]
        },
        {
            name: "表内乘法",
            range: [9, 9],
            operators: ["*"]
        },
        {
            name: "表内除法",
            range: [9, 9],
            operators: ["/"]
        },
        {
            name: "表内乘除法",
            range: [9, 9],
            operators: ["*", "/"]
        },
        {
            name: "多位数与一位数乘法",
            range: [999, 9],
            operators: ["*"]
        },
        {
            name: "多位数与一位数除法",
            range: [999, 9],
            operators: ["/"]
        },
        {
            name: "多位数与一位数乘除法",
            range: [999, 9],
            operators: ["*", "/"]
        },
        {
            name: "多位数加减法",
            range: [999, 999],
            operators: ["+", "-"]
        },
        {
            name: "多位数乘除法",
            range: [999, 999],
            operators: ["*", "/"]
        },
        {
            name: "大位数加减法",
            range: [99999, 99999],
            operators: ["+", "-"]
        },
        {
            name: "大位数乘除法",
            range: [99999, 99999],
            operators: ["*", "/"]
        }
    ];

    constructor() { }

    ngOnInit() {
    }
}