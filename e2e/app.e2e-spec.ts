import { LanguageAppPage } from './app.po';

describe('language-app App', function() {
  let page: LanguageAppPage;

  beforeEach(() => {
    page = new LanguageAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
