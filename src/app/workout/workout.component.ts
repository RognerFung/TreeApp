import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';

@Component({
    selector: 'app-workout',
    templateUrl: './workout.component.html',
    styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

    userinfo: any;
    sports: any;
    workouts: any;
    workout: any;
    today: Date = new Date();
    workoutToday: Array<any> = [];
    isFocus: Boolean;
    isDisabled: Boolean;

    constructor(
        private commonService: CommonService
    ) { }

    ngOnInit() {
        this.loadUserinfo(0);
        this.loadSports();
        this.loadWorkout(0);
    }

    loadUserinfo = function (user_id) {
        this.commonService.modifyUserinfo(
            {
                order: "select",
                data: { user_id: user_id }
            }).subscribe(
            data => {
                this.userinfo = data[0];
                console.log("userinfo:");
                console.log(this.userinfo);
            }, 
            error => this.errorMessage = error
        );
    };

    loadSports = function () {
        this.commonService.modifySports(
            {
                order: "select",
                data: { }
            }).subscribe(
            data => {
                this.sports = data;
                this.sports.forEach(element => {
                    delete element._id;
                    element.amount = 0;
                });
                console.log("sports:");
                console.log(this.sports);
            }, 
            error => this.errorMessage = error
        );
    };

    loadWorkout = function (user_id) {
        this.commonService.modifyWorkout(
            {
                order: "select",
                data: { user_id: user_id }
            }).subscribe(
            data => {
                this.workouts = data[0].workout;
                this.workout = JSON.parse(JSON.stringify(this.workouts));
                this.workout.forEach(element => {
                    element.sports = JSON.parse(JSON.stringify(this.sports));
                    for (let k in element.amounts) {
                        if (k !== "sports") {
                            element.sports[k].amount = element.amounts[k];
                        }
                    }
                    delete element.amounts;
                    let cal = 0;
                    element.sports.forEach(ele => {
                        ele.cal = ele.amount * ele.K * this.userinfo.weight;
                        cal += ele.cal;
                    });
                    element.cal = cal;
                });
                console.log("workout:");
                console.log(this.workout);
                if (this.workout[this.workout.length - 1].date === this.today.toDateString()) {
                    this.workoutToday = this.workout[this.workout.length - 1].sports;
                    this.workout.pop();
                } else {
                    this.workoutToday = JSON.parse(JSON.stringify(this.sports));
                }
            }, 
            error => this.errorMessage = error
        );
    };

    sumCal () {
        let cal = 0;
        this.workoutToday.forEach(element => {
            element.cal = element.amount * element.K * this.userinfo.weight;
            cal += element.cal;
        });
        return cal;
    }

    inputToday = function () {
        if (this.workouts[this.workouts.length - 1].date === this.today.toDateString()) {
            this.workouts.pop();
        }
        let newDate = {
            date: this.today.toDateString(),
            amounts: { }
        };
        this.workoutToday.forEach(element => {
            if (element.amount > 0) {
                newDate.amounts[this.workoutToday.indexOf(element).toString()] = parseInt(element.amount);
            }
        });
        this.workouts.push(newDate);
        this.commonService.modifyWorkout(
            {
                order: "update",
                data: { user_id: this.workout.user_id },
                new: { workout: this.workouts }
            }).subscribe(
            data => {
                
                console.log(data);
            }, 
            error => this.errorMessage = error
        );
        this.isFocus = false;
    }

    onFocus () {
        this.isFocus = true;
    }

    onInput () {
        let allNumber = this.workoutToday.every(element => {
            return !isNaN(element.amount);
        });
        this.isDisabled = allNumber ? null : true;
    }

}
