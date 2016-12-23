import { browser, element, by } from 'protractor';

export class Angular2AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeaderText() {
    return element(by.css('h1')).getText();
  }

  unreadCount() {
    return element(by.css('.badge')).getText();
  }

  clickThread(i) {
    return element.all(by.css('chat-thread')).get(i).click();
  }

  sendMessage(msg) {
    element(by.css('.chat-input')).sendKeys(msg);
    return element(by.buttonText('Send')).click();
  }

  getConversationText(i) {
    return element.all(by.css('.conversation')).get(i).getText();
  }

}
