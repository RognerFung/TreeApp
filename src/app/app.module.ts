import { AppComponent } from './app.component';
import { BranchComponent } from './branch/branch.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DrivingTestComponent } from './driving-test/driving-test.component';
import { EarlyEducationComponent } from './early-education/early-education.component';
import { ExampleComponent } from './example/example.component';
import { FlowchartComponent } from './flowchart/flowchart.component';
import { FooterComponent } from './footer/footer.component';
import { FruitComponent } from './fruit/fruit.component';
import { IndexComponent } from './index/index.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PowerComponent } from './power/power.component';
import { PracticeComponent } from './practice/practice.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SkillchartComponent } from './skillchart/skillchart.component';
import { StoryComponent } from './story/story.component';
import { TestComponent } from './test/test.component';
import { TreeComponent } from './tree/tree.component';

import { AutofocusDirective } from './_directives/autofocus.directive';
import { FocusDirective } from './_directives/focus.directive';

import { AppRoutingModule } from './/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgePipe } from './_pipes/age.pipe';
import { IdToNamePipe } from './_pipes/idToName.pipe';
import { OperatorPipe } from './_pipes/operator.pipe';

import { BranchService } from './_services/branch.service';
import { CommonService } from './_services/common.service';
import { MessageService } from './_services/message.service';
import { AudioDirective } from './_directives/audio.directive';
import { WorkoutComponent } from './workout/workout.component';

@NgModule({
    declarations: [
        AppComponent,
        BranchComponent,
        CarouselComponent,
        DrivingTestComponent,
        EarlyEducationComponent,
        ExampleComponent,
        FlowchartComponent,
        FooterComponent,
        FruitComponent,
        IndexComponent,
        JumbotronComponent,
        LoginComponent,
        MapComponent,
        NavbarComponent,
        PowerComponent,
        PracticeComponent,
        ProfileComponent,
        RegisterComponent,
        SkillchartComponent,
        StoryComponent,
        TestComponent,
        TreeComponent,

        AutofocusDirective,
        FocusDirective,

        AgePipe,
        IdToNamePipe,
        OperatorPipe,
        AudioDirective,
        WorkoutComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        RouterModule
    ],
    providers: [
        BranchService,
        CommonService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
