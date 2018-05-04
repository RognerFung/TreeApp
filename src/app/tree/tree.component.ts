import { Component, OnInit } from '@angular/core';
import { Tree } from '../tree';
import { Branch } from '../branch';
import { BranchService } from '../branch.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  
  branches: Branch[];
  username: string;

  constructor(
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.checkLogin();
    this.getBranches();
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

  getBranches = function () {
    this.commonService.getBranches().subscribe(
      data => {
        this.branches = data;
        console.log(data);
      }, 
      error => this.errorMessage = error
    );
  }
}
