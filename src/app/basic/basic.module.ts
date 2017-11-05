import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { SharedModule }           from '../shared/shared.module';
import { PersonListComponent }     from './object-oriented/person-list';

const routes: Routes =  [
  { path: '',  component: PersonListComponent },
];

@NgModule({
  imports:      [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ PersonListComponent ]
})
export class BasicModule { }


