import { Component, OnInit } from '@angular/core';
import { Drive } from '../_statics/drive';
import { DRIVES } from '../_statics/mock.drive';

@Component({
    selector: 'app-driving-test',
    templateUrl: './driving-test.component.html',
    styleUrls: ['./driving-test.component.css']
})

export class DrivingTestComponent implements OnInit {

    questions: Drive[] = DRIVES;
    selected: any;
    totalCount: number = this.questions.length;
    doneCount: number = 0;
    rightCount: number = 0;

    constructor() {}

    ngOnInit() {
    }

    select(item, question) {
        this.doneCount++;
        if (question.right === item) {
            this.rightCount++;
        }
        this.selected = item;
    };

    isActive(item) {
        return this.selected === item;
    };

    
}

