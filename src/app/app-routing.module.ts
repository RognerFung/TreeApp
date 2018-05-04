import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreeComponent } from './tree/tree.component';
import { BranchComponent } from './branch/branch.component';
import { FruitComponent } from './fruit/fruit.component';
import { ExampleComponent } from './example/example.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tree', component: TreeComponent },
  { path: 'tree/:branchId', component: BranchComponent },
  { path: 'tree/:branchId/:fruitId', component: FruitComponent },
  { path: 'tree/:branchId/:fruitId/example', component: ExampleComponent },
  { path: 'tree/:branchId/:fruitId/test', component: TestComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}