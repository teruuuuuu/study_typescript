import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By }                                from '@angular/platform-browser';
import { DebugElement }                      from '@angular/core';

import { UserProfileService }       from 'app/core/user-profile.service';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {

  let comp: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let componentUserService: UserProfileService; // the actually injected service
  let userService: UserProfileService; // the TestBed injected service
  let de: DebugElement;  // the DebugElement with the welcome message
  let el: HTMLElement; // the DOM element with the welcome message

  let userServiceStub: {
    isLoggedIn: boolean;
    user: { name: string}
  };

  beforeEach(() => {
    // stub UserService for test purposes
    userServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User'}
    };

    TestBed.configureTestingModule({
       declarations: [ WelcomeComponent ],
    // providers:    [ UserService ]  // NO! Don't provide the real service!
                                      // スタブを使ってテストする
       providers:    [ {provide: UserProfileService, useValue: userServiceStub } ]
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    comp    = fixture.componentInstance;

    // コンポーネントにDIされたuserServiceを取得
    userService = fixture.debugElement.injector.get(UserProfileService);
    componentUserService = userService;
    // root injectorからuserServiceを取り出す
    userService = TestBed.get(UserProfileService);

    //  get the "welcome" element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.welcome'));
    el = de.nativeElement;
  });

  it('should welcome the user', () => {
    fixture.detectChanges();
    // classがwelcomeのdom
    const content = el.textContent;
    // expect toContainの最初の引数が含まれる値で、２個目の引数がエラーの時に表示する答えの値
    expect(content).toContain('Welcome', '"Welcome ..."');
    expect(content).toContain('Test User', 'expected name');
  });

  it('should welcome "Bubba"', () => {
    userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
    fixture.detectChanges();
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false; // welcome message hasn't been shown yet
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });

  it('should inject the component\'s UserService instance',
    inject([UserProfileService], (service: UserProfileService) => {
    expect(service).toBe(componentUserService);
  }));

  it('TestBed and Component UserService should be the same', () => {
    // コンポーネントにdiされたサービスとroot injecterから取り出したサービスが一致するのを確認
    expect(userService === componentUserService).toBe(true);
  });

  it('stub object and injected UserService should not be the same', () => {
    expect(userServiceStub === userService).toBe(false);

    // スタブを変更してもサービスには影響しない
    userServiceStub.isLoggedIn = false;
    expect(userService.isLoggedIn).toBe(true);
  });
});
