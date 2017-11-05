# AngularHandson
Angularの[チュートリアル](https://angular.io/guide/quickstart)を通して使い方を覚えたいと思います。
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## 開発環境構築    
### angular-cliを使えるようにする
1.angular-cliをグローバルインストールする    
> npm install -g @angular/cli        

2.プロジェクトを作ってみる    
> ng new my-app    

3.アプリを起動する    
> cd my-app      
> ng serve --open      

"ng serve"で開発用のサーバを起動しファイルに対して変更があればすぐに修正を反映する動きをします。--openのオプションをつけることでコマンド実行時にブラウザを自動で開きます。

### Atomで開発
Atomで開発する場合はプラグインを探して入れておけば良さそうです。
[atom-typescript](https://github.com/TypeStrong/atom-typescript)をとりあえず入れておいた
## 開発
### angular-cliでのアプリ開発について
#### .angular-cli.json
開発環境の設定は.angular-cli.jsonで行なっており、最初に読み込みhtmlやスクリプト、ルートディレクトリやビルド時の出力先もここで設定している。アプリ全体でスタイルやスクリプトを適用したいという場合はここのscriptとstylesや、デフォルトのstyles.cssを修正する。アプリのルートディレクトリはsrcに設定してある。
```
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "project": {
    "name": "my-app"
  },
  "apps": [
    {
      "root": "src",
      "outDir": "dist",
      "assets": [
        "assets",
        "favicon.ico"
      ],
      "index": "index.html",
      "main": "main.ts",
      "polyfills": "polyfills.ts",
      "test": "test.ts",
      "tsconfig": "tsconfig.app.json",
      "testTsconfig": "tsconfig.spec.json",
      "prefix": "app",
      "styles": [
        "styles.css"
      ],
      "scripts": [],
      "environmentSource": "environments/environment.ts",
      "environments": {
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      }
    }
  ],
  "e2e": {
    "protractor": {
      "config": "./protractor.conf.js"
    }
  },
  "lint": [
    {
      "project": "src/tsconfig.app.json"
    },
    {
      "project": "src/tsconfig.spec.json"
    },
    {
      "project": "e2e/tsconfig.e2e.json"
    }
  ],
  "test": {
    "karma": {
      "config": "./karma.conf.js"
    }
  },
  "defaults": {
    "styleExt": "css",
    "component": {}
  }
}
```

### index.html
angular-cliで作成したプロジェクトのindex.htmlは以下のようになっている。app-rootという独自のタグを読み込んでいます。コンポーネントが初期化されるまではタグの中身の"Loading..."が表示されます。
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularHandson</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root>Loading...</app-root>
</body>
</html>

```

### main.ts
main.tsではアプリに必要なモジュールを読み込んでいます。環境変数などはJsonを読み込ませるかプロパティに直接定義するなどしてenvironmentで読み込めるようにしておくと良さそうです。リリース時はenableProdModeが有効になるようですが、angularの開発モードが無効になるなどの違いがあるようです。

```JavaScript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './main.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

### main.module.ts
main.tsで読み込んでいるモジュール。NgModuleでページの単位となるコンポーネント一覧を読み込んでいるのが確認できる。bootstrapはエントリポイントを指定していて、providersにはデータ共有に使うサービスとかを指定して、importsでは外部のモジュールを読み込んだりしていて、declarationsではディレクティブとパイプを読み込ませるらしい。ディレクティブとは先ほどのapp-rootなど独自に定義したタグのことを言っており、パイプについてはangularのhtml内で条件指定でフィルターかけるのに使う。BrowserModuleはブラウザの情報を取ってくるので必要になるっぽい。
```JavaScript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### index.component.ts
Componentアノテーションのselectorではディレクティブと使用するタグ名、templeteUrlでテンプレートhtml、styleUrlsでcssを指定してからclassないでスクリプトを記述している。titleはクラス変数でapp.component.htmlの表示で使用している。TypeScriptのクラス変数ではconstやletを付与しようとしたらコンパイラに怒られたので普遍にする場合はstatic readonlyとかつけたら良さそうと思ったけどそうしたらbindできなくなる動きをしていた。
```JavaScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class AppComponent {}
```

### index.component.html
index.component.tsのhtml表示用のテンプレートは最初は以下のようになっています。
```html
<!--The whole content below can be removed with the new code.-->
<div style="text-align:center">
  <h1>
  </h1>
</div>
```

### htmlとコンポーネントで2wayバインディングさせてみる
まずmain.module.tsで2wayバインディングに必要となるFormModuleを読み込ませます
main.module.ts
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //テンプレートでバインディングしたり、validationするのに必要

import { AppComponent } from './index.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
それからindex.component.tsとindex.component.htmlでコンポーネント内のクラス変数をbindさせてみます。
index.component.ts
```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class AppComponent {
  textInput = "input test";
}
```
index.component.html
```html
<!--The whole content below can be removed with the new code.-->
<div style="text-align:center">
  <h1>
    <input [(ngModel)]="textInput"><br />
    {{ textInput }}
  </h1>
</div>
```
これで実際に動かしてみると画面にコンポーネントのクラス変数が表示され、またinputタグへ入力を行いbindしている変数を変更すると値自体が変更され表示にも反映されるのが確認できます。

### ルータとサービスを使ってみる
angularのルータとサービスを利用してみたいと思います。angularのルータにより表示するコンポーネントを切り替えたりURLパラメータを受け取った処理ができるようになります。サービスはAPIを投げてデータを取得したりとか、コンポーネント間で共有するデータとかデータに関する操作とかを記述します。
まずルータを足してみます。
app/router/app.router.ts   
```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroDetailComponent } from 'app/component/heroDetail/hero.detail.component';

// コンポーネントとURLを関連づける
const routes: Routes = [
  { path: '', redirectTo: '/detail/1', pathMatch: 'full' },
  // URLパラメータをコンポーネントに渡すようにしている
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
ルータではURLとコンポーネントのマッピングを行います。


app/service/hero.service.ts
```javascript
import { Injectable } from '@angular/core';

import { Hero } from 'app/model/Hero';
import { HEROES } from 'app/mock/heros.mock';



@Injectable()
export class HeroService {

  getHeroes(): Promise<Hero[]> {
    console.log("hero service getHeros");
    console.info(HEROES); // 2wayバインドによりmockオブジェクト自体が変更されていることが確認できる
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  // id指定でデータ取得
  getHeroById(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }
}
```
サービスはインポートしたHEROESオブジェクトをPromiseにより非同期でレスポンスとして返す処理を行います。今回使用しているモック用のオブジェクトは以下のようになっています。
app/mock/heros.mock.ts
```javascript
import { Hero } from 'app/model/Hero';

export const HEROES: Hero[] = [
  { id: 1, name: 'Mr. Nick' },
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
```
それと、Heroの型は以下のようになっています。
app/model/Hero.ts
```javascript
export class Hero {
  id: number;
  name: string;
}
```

次にルータとサービスをモジュールとして使えるようにコンポーネントに読み込ませます。
main.module.ts
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //テンプレートでバインディングしたり、validationするのに必要

import { AppComponent } from 'index.component';
import { HeroDetailComponent } from 'app/component/heroDetail/hero.detail.component';

import { HeroService } from 'app/service/hero.service';
import { AppRoutingModule } from 'app/router/app.router';

@NgModule({
  imports: [
    AppRoutingModule, // 注意 ルータはdeclationではなくimportsにたす
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent
  ],
  providers: [
    HeroService // サービスはprovidersに追加する
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

次にルータとサービスで使用するHeroDetailComponentを追加してみたいと思います。    
app/component/heroDetail/hero.detail.component.ts
```javascript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from 'app/model/Hero';
import { HeroService } from 'app/service/hero.service';


@Component({
  selector: 'hero-detail', //ディレクティブのタグ名
  templateUrl: './hero.detail.component.html' //htmlテンプレートの読み込み
})
export class HeroDetailComponent implements OnInit {
  // テンプレートhtmlにbindして使用するクラス変数
  title = 'HeroDetail';
  hero: Hero = new Hero();

  // コンポーネントを使用する側で用途を決めれるようにする
  isSearchMode: Boolean = true;


  constructor(
    private heroService: HeroService,
    // urlパラメータを取得するのに必要
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if(this.isSearchMode){
      // ルータからパラメータ取得
      this.route.params.forEach((params: Params) => {
        console.log("hero detail component ngOnInit");
        console.info(params);
        if (params['id'] !== undefined) {
          const id = +params['id'];
          this.heroService.getHeroById(id)
              .then(hero => this.hero = hero);
        }
      });
    }
  }
}
```
app/component/heroDetail/hero.detail.component.html
```javascript
<!-- heroが見つかった時のみこの部分を表示する-->
<div *ngIf="hero">
  <h1>{{title}}</h1>
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <!-- 注意 ngMoelを使う場合はNgModuleでFormsModuleをインポートしないといけない-->
    <input [(ngModel)]="hero.name" placeholder="name">
  </div>
</div>

<!-- heroが見つからなかった場合の処理 -->
<div *ngIf="!hero">
  hero not found.
</div>
```

app/component/heroDetail/hero.detail.component.css
```css
h1 {
  color: #369;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}
```

それから、ルータのディレクティブをhtmlテンプレートに追加して使用できるようにします。
index.component.html
```html
<!--The whole content below can be removed with the new code.-->
<div style="text-align:center">
  <h1>
    <input [(ngModel)]="textInput"><br />
    {{ textInput }}<br />
</div>
<!-- ルータ配置用のテンプレート -->
<router-outlet></router-outlet>
```
これで動かしてみると'http://localhost:4200'のアクセスは'http://localhost:4200/detail/1'にリダイレクトされid=1のユーザが表示されるはずです。idの部分のパラメータを変更することで表示するユーザが切り替わることが確認できます。

### 別コンポーネントでも同一のサービスを使ってみる
別コンポーネントで同一のサービスを利用し2way-bindingによりサービス館でデータが共有されていることを確認します。
まず今回使用するサービスに以下のメソッドを追加します。先に追加している非同期の処理でも大丈夫ですが今回は既にサービスコンポーネントで保有されているデータを返す処理を追加したく非同期である必要はなさそうなのでそれ用のメソッドを追加しています。
```javascript
// データ共有をするだけの用途とかでPromiseを使わないこともできる
getSyncHero(id: number): Hero {
  return HEROES.find(hero => hero.id === id);
}
```
それから、以下のように既存のindex.component.tsでサービスを利用するように変更します。
index.component.ts
```javascript
import { Component, OnInit } from '@angular/core';

import { Hero } from 'app/model/Hero';
import { HeroService } from 'app/service/hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class AppComponent implements OnInit {
  textInput = "input test";
  hero: Hero = new Hero();

  constructor(
    private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.hero = this.heroService.getSyncHero(1);
  }
}
```
index.component.html
```
<!--The whole content below can be removed with the new code.-->
<div style="text-align:center">
  <h1>
    <input [(ngModel)]="textInput"><br />
    {{ textInput }}<br />
    <input [(ngModel)]="hero.name" placeholder="name"><br />
    {{ hero.name }}
  </h1>
</div>
<!-- ルータ配置用のテンプレート -->
<router-outlet></router-outlet>
```
これでindex.componentにもHeroの情報が表示され、またそれぞれのinputに対して入力すると即時で反映されることが確認できます。


### htmlテンプレートでループ処理をする
次にhtmlテンプレート内でループを回して描画を行ってみたいと思います。リストの情報を取得する以下のコンポーネントを追加します。    
app/component/heroList/hero.list.component.ts
```javascript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from 'app/model/Hero';
import { HeroService } from 'app/service/hero.service';


@Component({
  selector: 'hero-list',
  templateUrl: './hero.list.component.html',
  styleUrls: ['./hero.list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  title = 'HeroesList';
  selectedHero: Hero;

  // サービスはconstructorに足しておく
  constructor(
    private router: Router,
    private heroService: HeroService) {
  }

  ngOnInit(): void {
    // 再描画のたびに呼ばれるので、ここでメンバ変数を初期化
    console.log("HeroListComponent ngOnInit")
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
    /*
    this.heroService.getHeroesSlowly()
      .then(heroes => this.heroes = heroes);
      */
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
```
それから、htmlテンプレートを作成します。    
```html
<h1>{{title}}</h1>
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
    <span class="hero-element">
      <span class="badge">{{hero.id}}</span> {{hero.name}}</span>
  </li>
</ul>
```
上記の<li \*ngFor="let hero of heroes" ~の部分がコンポーネント内のメンバ変数であるheroesをループさせて描画処理を
行っています。hero === selectedHeroの条件が一致している場合はタグのクラスに"selected"を追加します。    
それとcssも作成しておきます。    


```css
.selected {
  background-color: #CFD8DC !important;
  background-color: rgb(0,120,215) !important;
  color: white;
}
.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;
}
.heroes li {
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #EEE;
  margin: .5em;
  padding: .5em;
  height: 1.6em;
  border-radius: 4px;
}
.heroes li:hover {
  color: #607D8B;
  color: rgb(0,120,215);
  background-color: #DDD;
  left: .1em;
}
.heroes li.selected:hover {
  /*background-color: #BBD8DC !important;*/
  color: white;
}
.heroes .text {
  position: relative;
  top: -3px;
}
.heroes .badge {
  display: inline-block;
  font-size: small;
  color: white;
  padding: 0.8em 0.7em 0 0.7em;
  background-color: #607D8B;
  background-color: rgb(0,120,215);
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}
button {
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
}
button:hover {
  background-color: #cfd8dc;
}
.error {color:red;}
button.delete-button{
  float:right;
  background-color: gray !important;
  background-color: rgb(216,59,1) !important;
  color:white;
}
```

あとは、main.moduleに今回のモジュールを追加して、ルータでURLとコンポーネントを関連づけることで表示が行えます。
main.module.ts
```JavaScript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //テンプレートでバインディングしたり、validationするのに必要

import { AppComponent } from 'index.component';
import { HeroDetailComponent } from 'app/component/heroDetail/hero.detail.component';
import { HeroListComponent } from 'app/component/heroList/hero.list.component';

import { HeroService } from 'app/service/hero.service';
import { AppRoutingModule } from 'app/router/app.router';

@NgModule({
  imports: [
    AppRoutingModule, // 注意 ルータはdeclationではなくimportsにたす
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroListComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
app/router/app.router.ts
```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroDetailComponent } from 'app/component/heroDetail/hero.detail.component';
import { HeroListComponent } from 'app/component/heroList/hero.list.component';

// コンポーネントとURLを関連づける
const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'list', component: HeroListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 子コンポーネントにデータを渡してみる
サービスを使ってコンポーネント間でデータが共有できるのは確認できましたので、次はサービスを使わずに直接コンポーネントに対してデータが渡せる確認してみたいと思います。    
まず、app/component/heroList/hero.list.component.htmlに以下を追加します。
```
<!-- コンポーネントのメンバ変数を[]で囲ったものに対して選択したheroを渡す -->
<hero-detail [hero]="selectedHero" [isSearchMode]="false"></hero-detail>
```
それからapp/component/heroDetail/hero.detail.component.tsのメンバ変数に@Input()を付与することで親コンポーネントからデータを受け取ることができるようになります。
app/component/heroDetail/hero.detail.component.ts
```javascript
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from 'app/model/Hero';
import { HeroService } from 'app/service/hero.service';


@Component({
  selector: 'hero-detail', //ディレクティブのタグ名
  templateUrl: './hero.detail.component.html' //htmlテンプレートの読み込み
})
export class HeroDetailComponent implements OnInit {
  // テンプレートhtmlにbindして使用するクラス変数
  title = 'HeroDetail';
  @Input()  hero: Hero = new Hero();

  // コンポーネントを使用する側で用途を決めれるようにする
  @Input()  isSearchMode: Boolean = true;


  constructor(
    private heroService: HeroService,
    // urlパラメータを取得するのに必要
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if(this.isSearchMode){
      // ルータからパラメータ取得
      this.route.params.forEach((params: Params) => {
        console.log("hero detail component ngOnInit");
        console.info(params);
        if (params['id'] !== undefined) {
          const id = +params['id'];
          this.heroService.getHeroById(id)
              .then(hero => this.hero = hero);
        }
      });
    }
  }
}
```

### コンポーネント間で画面遷移してみる
コンポーネント間で遷移できるようにするためまずapp/component/heroList/hero.list.component.tsに以下のメソッドを追加します。
```javascript
gotoDetail(): void {
  this.router.navigate(['/detail', this.selectedHero.id]);
}
```
それから、app/component/heroList/hero.list.component.htmlからgotoDetailを呼び出せるようにするため、以下のように修正します。
```html
<h1>{{title}}</h1>
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
    <span class="hero-element">
      <span class="badge">{{hero.id}}</span> {{hero.name}}</span>
  </li>
</ul>

<!-- コンポーネントのメンバ変数を[]で囲ったものに対して選択したheroを渡す -->
<!--
<hero-detail [hero]="selectedHero" [isSearchMode]="false"></hero-detail>
-->

<div *ngIf="selectedHero">
  <h2>
    {{selectedHero.name | uppercase}} is my hero
  </h2>
  <button (click)="gotoDetail()">View Details</button>
</div>
```

次にapp/compnent/heroDetail/hero.detail.compnentでは遷移元に戻れるように以下のメソッドを追加します。
```
goBack(savedHero: Hero = null): void {
  window.history.back();
}
```
それからapp/compnent/heroDetail/hero.detail.compnent.htmlから呼び出せるように以下のように修正します。
```html
<!-- heroが見つかった時のみこの部分を表示する-->
<div *ngIf="hero">
  <h1>{{title}}</h1>
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <!-- 注意 ngMoelを使う場合はNgModuleでFormsModuleをインポートしないといけない-->
    <input [(ngModel)]="hero.name" placeholder="name"><br />
    <button (click)="goBack()">Back</button>
  </div>
</div>

<!-- heroが見つからなかった場合の処理 -->
<div *ngIf="!hero">
  hero not found.
</div>
```
これでコンポーネント間での画面繊維が確認できたかと思います。


### もう一つコンポーネントを追加してみる
次にダッシュボードコンポーネントを追加して、こちらからもhero.detail.compnentに遷移できるようにしたいと思います。
以下のapp/component/dashboard/dashboard.component.tsを作成します。
```javascript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from 'app/model/Hero';
import { HeroService } from 'app/service/hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private router: Router,
    private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 6));
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
```
それからhtmlテンプレートを作成します。
```html
<div class="grid grid-pad">
  <h3>Top Heroes</h3>
  <div *ngFor="let hero of heroes" (click)="gotoDetail(hero)"  class="col-1-4">
    <div class="module hero">
      <h4>{{hero.name}}</h4>
    </div>
  </div>
</div>
```
あとはmain.module.tsでDashboardComponentを読み込むようにし、ルータに追加しておくと画面が表示されるようになります。

### httpリクエストを投げれるようにしてみる
次にhttpリクエストを投げれるようにしてみます。リクエストを受けるWEBサーバを準備するのは面倒なのでangularのモックを利用します。そのためにはmain.module.tsで以下のモジュールをインポートするようにします。
```javascript
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'; // npm install --save angular-in-memory-web-api
```
"angular-in-memory-web-api"はangular本体に組み込まれていないので以下のコマンドでインストールしておきます。
> npm install --save angular-in-memory-web-api

それから、レスポンスとして返すデータを定義するapp/service/in-memory-data.service.tsを作成します。
```javascript
// angular-in-memory-web-apiで使うモックのapiの初期データ
export class InMemoryDataService {
  createDb() {
    const heroes = [
      { id: 1, name: 'one' },
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return { heroes };
  }
}
```
ここまで済んだらmain.module.tsを以下のように修正しWebAPIのモックを使用できるようにします。
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //テンプレートでバインディングしたり、validationするのに必要
import { HttpModule }    from '@angular/http'; // httpサービスを利用するのに必要

// 今回はWebAPIのモックを使用する
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'; // npm install --save angular-in-memory-web-api
import { InMemoryDataService }  from 'app/service/in-memory-data.service';

import { AppComponent } from 'index.component';
import { HeroDetailComponent } from 'app/component/heroDetail/hero.detail.component';
import { HeroListComponent } from 'app/component/heroList/hero.list.component';
import { DashboardComponent } from 'app/component/dashboard/dashboard.component';

import { HeroService } from 'app/service/hero.service';
import { AppRoutingModule } from 'app/router/app.router';

@NgModule({
  imports: [
    AppRoutingModule, // 注意 ルータはdeclationではなくimportsにたす
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroListComponent,
    DashboardComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

次にapp/service/hero.service.tsを修正しWebAPI経由でデータを取得するようにします。まず"angular/http"モジュールとrxjsのtoPromiseをインポートします。
angular/httpのレスポンスはrxjsのtoPromiseで非同期で扱うのでrxjsのインポートも必要になります。
```javascript
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
```
それからコンポーネント内のメッソッドを以下のように修正しWebAPI経由でデータを取得するように変更します。
```javascript
private heroesUrl = 'api/heroes';  // URL to web api
private headers = new Headers({ 'Content-Type': 'application/json' });

constructor(private http: Http) { }

getHeroes(): Promise<Hero[]> {
  console.log("hero service getHeros");
  return this.http.get(this.heroesUrl)
    .toPromise()
    // jsonのレスポンスを受け取ってHero型の配列に変換する
    .then(response => response.json().data as Hero[])
    .catch(this.handleError);
}

getHeroById(id: number): Promise<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get(url)
    .toPromise()
    .then(response => response.json().data as Hero)
    .catch(this.handleError);
}

// httpリクエスト失敗時の処理
private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
}
```
今回はrxjsを使用していますがレスポンスのjsonをHero型の配列に変換するだけなので
```javascript
.toPromise()
.then(response => response.json().data as Hero)
```
のようになっています。

動かしてみると一覧表示をする際に毎回データを撮り直しているため、heroの名前を変更して一覧に戻ると変更が反映されないというのが確認できるかと思います。これまではサービスをコンポーネント間でのデータの共有として使っていたのですが、今回の修正でサービスをWebサーバに対してサービスを投げる用途で使うようにしたのでその違いはわかるようにしておきたいです。例えば共通のAPIで取得した結果を複数のコンポーネントで使うという必要があるのでしたら、サービスコンポーネント内にデータ保有用の変数を用意しておきWebAPIを呼び出した後はその変数を変更するようにする必要があるかと思います。

### 追加、更新、削除のリクエストを投げれるようにしてみる
サービス側に追加、更新、削除のリクエストを投げるメソッドを追加します。
```javascript
// angular-in-memory-web-apiのcreateApi呼び出し
create(name: string): Promise<Hero> {
  return this.http
    .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
    .toPromise()
    .then(res => res.json().data as Hero)
    .catch(this.handleError);
}

// angular-in-memory-web-apiのupdateApi呼び出し
update(hero: Hero): Promise<Hero> {
  const url = `${this.heroesUrl}/${hero.id}`;
  return this.http
    .put(url, JSON.stringify(hero), { headers: this.headers })
    .toPromise()
    .then(() => hero)
    .catch(this.handleError);
}

delete(id: number): Promise<void> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.delete(url, { headers: this.headers })
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
}
```
httpモジュールのpost、put、deleteを使い分けていますが違いは[ここ](https://stackoverflow.com/questions/24352106/difference-between-http-get-http-post-http-put-http-delete-http-head-a)のstackoverflowを確認するのが良さそうです。

あとは各コンポーネントからサービスを利用するようにしたら、heroの名前変更が一覧に反映されたり、登録、削除が確認できるかと思います。

### 検索を行ってみる
サービスに検索用のリクエストを投げるメソッドを追加します。
```javascript
search(term: string): Observable<Hero[]> {
  return this.http
    .get(`app/heroes/?name=${term}`)
    .map(response => response.json().data as Hero[]);
}
```
レスポンスをそのままHero型の配列にセットするだけなので今までと同様にtoPromise()~で大丈夫かと思ったのですが、getリクエストの場合はtoPromiseが使えないようです。
この辺りはrxjsとhttpモジュール周りの学習が必要になりそうです。
それから以下のapp/component/heroSearch/hero.search.componentモジュールを追加してdashboardコンポーネントに配置すると検索コンポーネントが使えるようになります。
app/component/search/hero.search.component.ts
```javascript
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { HeroService } from 'app/service/hero.service';
import { Hero } from 'app/model/Hero';

@Component({
  selector: 'hero-search',
  templateUrl: './hero.search.component.html',
  styleUrls: [ './hero.search.component.css' ],
  providers: [HeroService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.heroService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Hero[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
```
app/component/heroSearch/hero.search.comonent.html
```html
<div id="search-component">
  <h4>Hero Search</h4>
  <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
  <div>
    <div *ngFor="let hero of heroes | async"
         (click)="gotoDetail(hero)" class="search-result" >
      {{hero.name}}
    </div>
  </div>
</div>
```
app/component/heroSearch/hero.search.component.css
```css
.search-result{
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  width:195px;
  height: 16px;
  padding: 5px;
  background-color: white;
  cursor: pointer;
}

.search-result:hover {
  color: #eee;
  background-color: #607D8B;
}

#search-box{
  width: 200px;
  height: 20px;
}
```
検索用のコンポーネントでは入力に変更があったらrxjsでサービスを呼び出すようにしています。angularのチュートリアルでrxjsが使われているので、angularをやるならrxjsを覚えていた方が良さそうに思いました。
あとは今までと同様main.module.tsでモジュールを読み込むようにしダッシュボードコンポーネントに表示するようにして動作は確認できるかと思います。

## コンポーネント内のメンバ変数の変更を監視する
例えばコンポーネント内に以下のメンバ変数があったとします。
```javascript
@Input() textInput: String = "";
```
このメンバ変数は親のコンポーネントから直接値を変更されることがあるため、値が変更されたタイミングに実行したメソッド等ある場合は監視が必要になりそうですが、以下のように@Inputで監視対象の変数を指定することで変更された際に何をするか指定することができます。

```javascript
@Input('textInput')
set updateInternalVal(externalVal) {
  this.textInput = externalVal;
  this.onEditChange();
}
```

## 自作のカスタムディレクティブに対して双方向バインディングしてみる
inputタグなど元からhtmlに存在しているタグであればng-modelでバインドすることでinputへの入力がバインドしている変数に直接反映されるし、バインドしている変数自体を変更することでバインド先へのinputタグの表示が切り替わる双方向バインドが働いてますが、Angular2以降では自作のディレクティブに対しての双方向バインドが廃止されたようでちょっと工夫が必要なようでした。   
以下自分が試した方法になります。

### Outputを受け取る際に変数を変更する
例えば以下のコンポーネントがあったとします。
myText.html
```html
<input [(ngModel)]="textInput" (ngModelChange)="onEditChange()" placeholder="{{ placeHolder }}"/> {{ textLength }}
```

myText.ts
```javascript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';


@Component({
  selector: 'my-text',
  templateUrl: './myText.html',
  styleUrls: [ './myText.css' ]
})
export class MyTextComponent {
  @Input() textInput: String = "";
  @Input() placeHolder: String = "";

  textLength: Number = 0;

  @Output() textChange = new EventEmitter<String>();

  // 親コンポーネントからの値の変更時に実行
  @Input('textInput')
  set updateInternalVal(externalVal) {
    this.textInput = externalVal;
    this.onEditChange();
  }

  onEditChange(): void {
    if(this.textInput !== void 0 && this.textInput.length !== void 0){
      this.textLength = this.textInput.length;
    }
    this.textChange.emit(this.textInput);
  }
}
```
このコンポーネントはメンバ変数textInputに親からバインドしているものがセットされているのですが、コンポーネント内で変数の値が変更されたことを親へ伝えるのには以下のようにカスタムのイベントを発行しています。
```javascript
this.textChange.emit(this.textInput);
```
その場合、呼び出し元の親コンポーネントは以下のようにtextChangeのイベントを受け取った際にバインド先の変数を変更することで双方向バインドの動きになります。
```html
<my-text [(textInput)]="hero.name" (textChange)="hero.name = $event" placeHolder="name"></my-text><br />
```

### Outputのカスタムイベント名を"メンバ変数 + Change"にすることで自動で双方向バインドする
さっきの方法だと親コンポーネント側で双方向バインドするか選べましたが、こっちの方は子コンポーネントの方で直接双方向バインドするように指定できます。
まず子コンポーネント側でカスタムイベントの名称を"メンバ変数 + Change"に指定し、値に変更があったらemitするようにします。
myText.ts
```javascript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';


@Component({
  selector: 'my-text',
  templateUrl: './myText.html',
  styleUrls: [ './myText.css' ]
})
export class MyTextComponent {
  @Input() textInput: String = "";
  @Input() placeHolder: String = "";

  textLength: Number = 0;

  @Output() textInputChange = new EventEmitter<String>();

  // 親コンポーネントからの値の変更時に実行
  @Input('textInput')
  set updateInternalVal(externalVal) {
    this.textInput = externalVal;
    this.onEditChange();
  }

  onEditChange(): void {
    if(this.textInput !== void 0 && this.textInput.length !== void 0){
      this.textLength = this.textInput.length;
    }
    this.textInputChange.emit(this.textInput);
  }
}
```

この場合は、イベントが発行された時に何をするとか特に指定しなくても双方向バインドが実現されます。以下呼び出し元のサンプルになります。
```html
<my-text [(textInput)]="hero.name" placeHolder="name"></my-text><br />
```

### BehaviorSubjectを使って簡単なstoreを実装して見る
今まではサービスを利用する時はPromiseを返していたのですが、それだとただのメソッドで結果はサービスの呼び出し元のみに取得されます。そこで、サービスの結果を他のコンポーネントで利用する時にどう共有すれば良いのかが課題になるかと思います。
その場合は、RxJSのBehaviorSubjectを利用することでデータを管理するstoreを実現し他のコンポーネント間でもデータを共有できるようにします。
まず以下のようにデータのstoreを実装します。
```javascript

import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

import {BehaviorSubject} from "rxjs/Rx";

import { Hero } from 'app/model/Hero';

@Injectable()
export class HeroStore {

    private _heros: BehaviorSubject<Hero[]> = new BehaviorSubject([]);

    constructor() {}

    setHeros(heros: Hero[]): void{
      this._heros.next(heros)
    }

    get heros(): Observable<Hero[]> {
        return this.asObservable(this._heros);
    }

    asObservable(subject: BehaviorSubject<Hero[]>) {
        return new Observable(fn => subject.subscribe(fn));
    }
}
```

それから、storeを利用する場合は以下のようになります。
ここでは"this.heroStore.heros.subscribe(heroes => this.heroes = heroes.slice(0, 6));"
のところでstoreで保持されている値を共有するようにしています。


```javascript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from 'app/model/Hero';
import { HeroService } from 'app/service/hero/hero.service';

import { HeroStore } from 'app/store/hero.store';
import { Observable } from "rxjs";

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private router: Router,
    private heroService: HeroService,
    private heroStore: HeroStore) {
  }

  ngOnInit(): void {
    this.heroService.setHeroStore();
    this.heroStore.heros.subscribe(
      heroes => this.heroes = heroes.slice(0, 6)
    );
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
```


##　触ってみた感想
Angularの1は触ったことがあったのですが、それに比べてだいぶ分かりやすくて扱いやすくなったと思います。特にルータ周りはReactと比べて優位に立ってそうな気がしました。


## スタイルガイド
以下のangular開発時のスタイルガイドを参考にしたい  
https://github.com/mgechev/angularjs-style-guide/blob/master/README-ja-jp.md

### routerとbootstrapをappディレクトリ直下のapp.jsに写す
今までindex.component.tsとapp.router.tsで分けていたコンポーネントを一つにしてみる
```javascript
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroDetailComponent } from 'app/component/heroDetail/hero.detail.component';
import { HeroListComponent } from 'app/component/heroList/hero.list.component';
import { DashboardComponent } from 'app/component/dashboard/dashboard.component';

// コンポーネントとURLを関連づける
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'list', component: HeroListComponent },
  { path: 'dashboard', component: DashboardComponent }
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
```

その場合はmain.module.tsの@NgModule内でimportsとdeclarationsそれからbootstrapにコンポーネントを追加する。作ったコンポーネントの中で一番最初に動くっていうのがイメージがつきそうな気がする。
```javascript
@NgModule({
  imports: [
    AppComponent,
~~~
  ],
  declarations: [
    AppComponent,
~~~
  ],
  providers: [
    HeroService
  ],
  bootstrap: [AppComponent]
})
```

### サブモジュールの名称
```
モジュール b がモジュール a のサブモジュールである場合、 a.b のようにネームスペースを利用してネストすることができます。
モジュールを構造化する方法は一般的に2つあります：

機能性
コンポーネントタイプ
今現在、2つに大きな違いはありませんが、1.の方法がより整って見えます。また、もし遅延ローディング・モジュールが実装されたら(AnglarJSのロードマップにはありませんが)、アプリケーションのパフォーマンスが向上するでしょう。
```
とのことらしい

### ディレクトリ構造
とりあえずディレクディブについては以下のようにしておいた
```
./directives
├── dashboard
│   ├── dashboard.css
│   ├── dashboard.html
│   └── dashboard.ts
└── hero
    ├── detail
    │   ├── hero.detail.css
    │   ├── hero.detail.html
    │   └── hero.detail.ts
    ├── list
    │   ├── hero.list.css
    │   ├── hero.list.html
    │   └── hero.list.ts
    └── search
        ├── hero.search.css
        ├── hero.search.html
        └── hero.search.ts
```
サービス以下についてもどうするか決めておきたい

### ディレクトリ名に複数の単語が含まれる場合はケバブケースを使用する
ディレクティブとしてmy-textディレクトリにmyText.tsを追加した
