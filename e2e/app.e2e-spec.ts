import { AngularChatPage } from './app.po';
import { browser } from 'protractor';

describe('angular-rxjs-chat App', () => {
  let page: AngularChatPage;

  beforeEach(() => {
    page = new AngularChatPage();
  });

  it('should load the page', () => {
    page.navigateTo();

    expect(page.unreadCount()).toMatch(`4`);

    page.clickThread(1);
    expect(page.unreadCount()).toMatch(`3`);

    page.clickThread(2);
    expect(page.unreadCount()).toMatch(`2`);
    page.sendMessage('3');

    page.clickThread(3);
    expect(page.unreadCount()).toMatch(`0`);

    page.clickThread(0);
    // expect(page.unreadCount()).toMatch(`1`);
    // expect(page.getConversationText(3)).toContain(`I waited 3 seconds`);

    browser.sleep(5000).then(function() {
      expect(page.getConversationText(0)).toContain(`I waited 3 seconds`);
    });
  });
});
