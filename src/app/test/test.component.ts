import { Component, OnInit, Input, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

    @Input() testType: any;
    index: number = 0;
    points: number = 0;
    numbers: number[];
    operators: string[];
    brackets: string[];
    question: string;
    answer: number;
    answered: boolean = false;
    public inputFocus = new EventEmitter<boolean>();
    public buttonFocus = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
        this.raiseQuestion();
    }

    questionType = function (tType) {
        
        var opt = tType.operators[Math.floor(Math.random() * tType.operators.length)];
        this.numbers = this.genNum(tType.range[0], tType.range[1], opt);
        this.operators = opt;
        var qst: string = this.numbers[0].toString();
        for (var i = 1; i < this.numbers.length; i++) {
            qst = qst.concat(" ", this.operators[i - 1]); 
            qst = qst.concat(" ", this.numbers[i].toString()); 
        }
        return qst;
    };

    genNum = function (range1, range2, opt) {
        if (opt === "/") {
            var x = Math.floor(Math.random() * range1 + 1);
            var y = Math.floor(Math.random() * range2 + 1);
            return [x * y, y];
        } else if (opt === "-") {
            return [Math.floor(Math.random() * range1 + 1), Math.floor(Math.random() * range2 + 1)].sort().reverse();
        } else {
            return [Math.floor(Math.random() * range1 + 1), Math.floor(Math.random() * range2 + 1)];
        }
    }
    raiseQuestion = function () {
        if (this.answer && this.checkAnswer(this.answer)) {
            this.points ++;
        }
        this.index ++;
        this.answered = false;
        this.answer = undefined;
        this.question = this.questionType(this.testType);
        this.inputFocus.emit(true);
    };

    checkAnswer = function (answer) {
        this.answered = true;
        this.buttonFocus.emit(true);
        return eval(this.question) === parseInt(answer);
    };

}
