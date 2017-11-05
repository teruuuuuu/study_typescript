import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }  from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //テンプレートでバインディングしたり、validationするのに必要
import { HttpModule }    from '@angular/http'; // httpサービスを利用するのに必要
// 今回はWebAPIのモックを使用する
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'; // npm install --save angular-in-memory-web-api
import { InMemoryDataService }  from 'app/heroes/service/in-memory-data.service';

import { CoreModule } from 'app/core/core.module';
import { AppComponent } from 'app/app';
import { SharedModule }           from 'app/shared/shared.module';
import { HeroesServiceModule } from 'app/heroes/service/hero-service.module';
import { StoreModule } from 'app/store/store-module';


@NgModule({
  imports: [
    AppComponent,
    BrowserModule,
    CoreModule,
    //FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    SharedModule,
    StoreModule,
    HeroesServiceModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
