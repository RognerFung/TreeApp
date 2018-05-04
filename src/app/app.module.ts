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
import { TestComponent } from './test/test.component';
import { IdToNamePipe } from './idToName.pipe';
import { LocalStorageModule } from 'angular-2-local-storage';
import { LoginComponent } from './login/login.component';
import { CommonService } from './common.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    BranchComponent,
    FruitComponent,
    ExampleComponent,
    TestComponent,
    IdToNamePipe,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    BranchService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
