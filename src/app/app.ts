import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// コンポーネントとURLを関連づける
const routes: Routes = [
  { path: '', redirectTo: 'basic', pathMatch: 'full'},
  { path: 'basic', loadChildren: 'app/basic/basic.module#BasicModule'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppComponent {}
