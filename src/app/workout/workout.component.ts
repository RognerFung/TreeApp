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

    public barChartData:Array<any>;
    public barChartLabels:Array<any>;
    public barChartOptions:any = {
        responsive: true
    };
    public barChartColors:Array<any> = [
        { // jog-red
            backgroundColor: 'red'
        },
        { // run-orange
            backgroundColor: 'orange'
        },
        { // swim-yellow
            backgroundColor: 'yellow'
        },
        { // plunk-green
            backgroundColor: 'green'
        },
        { // lift-blue
            backgroundColor: 'blue'
        },
        { // stretch-purple
            backgroundColor: 'purple'
        },
        { // line-cal-gold
            backgroundColor: 'transparent',
            borderColor: 'gold',
            pointBackgroundColor: 'black',
            pointBorderColor: 'white',
            pointHoverBackgroundColor: 'white',
            pointHoverBorderColor: 'black'
        }
      ];
    public barChartLegend:boolean = true;
    public barChartType:string = 'bar';
    
     
    // events
    public chartClicked(e:any):void {
        console.log(e);
    }
    
    public chartHovered(e:any):void {
        console.log(e);
    }

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
                console.log(this.workoutToday[0]);
                let s = ["jog", "run", "swim", "plunk", "lift", "stretch"];
                console.log(s);

                this.barChartData = [];
                for (let i = 0; i < this.sports.length; i++) {
                    let bar = this.workout.map(element => {
                        return Math.ceil(element.sports[i].cal);
                    });
                    bar.push(Math.ceil(this.workoutToday[i].cal));
                    this.barChartData.push(
                        {
                            data: bar,
                            label: s[i]
                        }
                    );
                }
                let line = this.workout.map(element => {
                    return Math.ceil(element.cal);
                });
                line.push(Math.ceil(this.sumCal()));
                this.barChartData.push(
                    {
                        data: line,
                        label: "cal",
                        type: "line"
                    }
                );
                let labels = this.workout.map(element => {
                    return element.date;
                });
                labels.push(this.today.toDateString());
                this.barChartLabels = labels;
                console.log(this.barChartData);
                console.log(this.barChartLabels);
                console.log(this.today.toDateString());
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
