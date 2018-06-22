import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreeComponent } from './tree/tree.component';
import { BranchComponent } from './branch/branch.component';
import { FruitComponent } from './fruit/fruit.component';
import { ExampleComponent } from './example/example.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { MapComponent } from './map/map.component';
import { PowerComponent } from './power/power.component';
import { PracticeComponent } from './practice/practice.component';
import { DrivingTestComponent } from './driving-test/driving-test.component';
import { EarlyEducationComponent } from './early-education/early-education.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'power', component: PowerComponent },
    { path: 'map', component: MapComponent },
    { path: 'practice', component: PracticeComponent },
    { path: 'driving-test', component: DrivingTestComponent },
    { path: 'early-education', component: EarlyEducationComponent },
    { path: 'tree', component: TreeComponent },
    { path: 'tree/:branchId', component: BranchComponent },
    { path: 'tree/:branchId/:fruitId', component: FruitComponent },
    { path: 'tree/:branchId/:fruitId/example', component: ExampleComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}