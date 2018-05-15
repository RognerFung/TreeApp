import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { BranchComponent } from './branch/branch.component';
import { AppRoutingModule } from './/app-routing.module';
import { FruitComponent } from './fruit/fruit.component';
import { BranchService } from './branch.service';
import { RouterModule } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { IdToNamePipe } from './idToName.pipe';
import { LocalStorageModule } from 'angular-2-local-storage';
import { LoginComponent } from './login/login.component';
import { CommonService } from './common.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageService } from './message.service';

@NgModule({
    declarations: [
        AppComponent,
        TreeComponent,
        BranchComponent,
        FruitComponent,
        ExampleComponent,
        IdToNamePipe,
        LoginComponent,
        RegisterComponent,
        NavbarComponent,
        CarouselComponent,
        JumbotronComponent,
        FooterComponent,
        IndexComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        HttpModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    providers: [
        BranchService,
        CommonService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
