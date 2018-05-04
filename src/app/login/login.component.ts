import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(
    private commonService : CommonService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  verifyUser = function(user) {
    this.commonService.verifyUser(user)
      .subscribe( data => {
        if (data) {
          console.log('登录成功');
          this.router.navigateByUrl('/tree');
        } else {
          console.log('用户名与密码不符');
        }
      }, error => this.errorMessage = error )
  }
}