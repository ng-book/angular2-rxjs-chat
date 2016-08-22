// import {MessagesService} from '../app/ts/services/services';

import {Calculator} from 'calculator';

describe('Hello', () => {

  it('should test', () => {
    // let m = MessagesService;
  });

  it('should add', () => {
    let c = new Calculator();
    expect(true).toBe(true);
    expect(c.add(1,2)).toBe(3);
  });

});
