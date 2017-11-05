import { NgModule }      from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }  from '@angular/common'; // BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule insteadらしい
import { FormsModule }   from '@angular/forms';
//import { HttpModule }    from '@angular/http'; // httpサービスを利用するのに必要

import { MyTextComponent } from './my-text/MyText';
import { BannerComponent } from './banner/banner.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TwainComponent } from './twain/twain.component';
import { TwainService } from './twain/twain.service';

@NgModule({
  imports:      [ CommonModule, FormsModule ],
  exports:      [ CommonModule, FormsModule,
                  MyTextComponent, BannerComponent, WelcomeComponent, TwainComponent],
  declarations: [ MyTextComponent, BannerComponent, WelcomeComponent, TwainComponent ],
  providers: [ TwainService ]
})
export class SharedModule { }
