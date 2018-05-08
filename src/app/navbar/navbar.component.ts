import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../common.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    username: string;

    constructor(
        private commonService: CommonService
    ) { }

    ngOnInit() {
        this.checkLogin();
    }

    isCollapsed: Boolean = true;
    
    toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }
    
    selectAndClose(): void {
        this.isCollapsed = false;
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

    signOut = function () {
        this.commonService.signOut().subscribe(
            data => {
                this.checkLogin();
                console.log('sign out successfully');
            },
            error => this.errorMessage = error
        )
    }

}
