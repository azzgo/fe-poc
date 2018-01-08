import { Ng2WorkshopRetainAppPage } from './app.po';

describe('ng2-workshop-retain-app App', function() {
  let page: Ng2WorkshopRetainAppPage;

  beforeEach(() => {
    page = new Ng2WorkshopRetainAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
