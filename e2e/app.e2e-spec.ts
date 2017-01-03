import { Angular2AppPage } from './app.po';
import { browser } from 'protractor';

describe('ng-book rxjs-chat Example App', function() {
  let page: Angular2AppPage;

  beforeEach(() => {
    page = new Angular2AppPage();
  });

  it('should load the page', () => {
    page.navigateTo();

    expect(page.unreadCount()).toMatch(`4`);

    page.clickThread(1);
    expect(page.unreadCount()).toMatch(`3`);

    page.clickThread(2);
    expect(page.unreadCount()).toMatch(`2`);

    page.clickThread(3);
    expect(page.unreadCount()).toMatch(`0`);

    page.clickThread(2);
    page.sendMessage('3');
    expect(page.unreadCount()).toMatch(`0`);

    page.clickThread(1);

    browser.sleep(5000).then(function() {
      expect(page.getConversationText(0)).toContain(`I waited 3 seconds`);
    });
  });

});
