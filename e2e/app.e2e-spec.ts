import { CitationsPage } from './app.po';

describe('citations App', function() {
  let page: CitationsPage;

  beforeEach(() => {
    page = new CitationsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
