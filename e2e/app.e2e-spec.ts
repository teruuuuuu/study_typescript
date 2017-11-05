import { AngularHandsonPage } from './app.po';

describe('angular-handson App', () => {
  let page: AngularHandsonPage;

  beforeEach(() => {
    page = new AngularHandsonPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
