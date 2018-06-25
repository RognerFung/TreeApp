import { Component, OnInit } from '@angular/core';
import { Tree } from '../_statics/tree';
import { Branch } from '../_statics/branch';
import { BranchService } from '../_services/branch.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CommonService } from '../_services/common.service';

@Component({
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  
    branches: Branch[];

    constructor(
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.getBranches();
        this.checkLogin();
    }


    getBranches = function () {
        this.commonService.getBranches().subscribe(
            data => {
                this.branches = data;
                console.log(data);
            }, 
            error => this.errorMessage = error
        );
    }

    checkLogin = function () {
        this.commonService.checkLogin().subscribe(
            data => {
                if (data) {
                    this.username = data.data;
                    console.log(data.data);
                } else {
                    this.username = 'guest';
                    console.log('guest');
                }
            },
            error => this.errorMessage = error
        );
    }
}
