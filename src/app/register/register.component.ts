import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usernameTaken: boolean = false;
  regDone: boolean = false;

  constructor(
    private commonService : CommonService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  verifyUsername = function(username) {
    this.commonService.verifyUsername({username: username, password: '0'}).subscribe(
      data => {
        if (Object.keys(data).length === 0) {
          this.usernameTaken = false;
        } else {
          this.usernameTaken = true;
        }
      },
      error => this.errorMessage = error
    )
  }

  regUser = function(user) {
    this.commonService.regUser({username: user.username, password: user.password1}).subscribe(
      data => {
        this.router.navigateByUrl('/login');
      },
      error => this.errorMessage = error
    )
  }
};
