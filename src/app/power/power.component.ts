import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-power',
    templateUrl: './power.component.html',
    styleUrls: ['./power.component.css']
})
export class PowerComponent implements OnInit {

    data: any = [
        {
            content: "数学",
            score: 0.9
        },
        {
            content: "科学",
            score: 0.8
        },
        {
            content: "艺术",
            score: 0.4
        },
        {
            content: "体育",
            score: 1.1
        },
        {
            content: "英语",
            score: 0.6
        },
        {
            content: "语文",
            score: 0.7
        },
        {
            content: "历史",
            score: 0.7
        },
        {
            content: "地理",
            score: 0.7
        },
        {
            content: "金融",
            score: 0.7
        },
        {
            content: "编程",
            score: 0.7
        }
    ];

    constructor() { }

    ngOnInit() {
    }
}