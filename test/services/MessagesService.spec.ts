import {MessagesService} from '../../app/ts/services/services';
import {Message, User, Thread} from '../../app/ts/models';

describe('MessagesService', () => {
  it('should test', () => {

    let user: User = new User('Nate', '');
    let thread: Thread = new Thread('t1', 'Nate', '');
    let m1: Message = new Message({
      author: user,
      text: 'Hi!',
      thread: thread
    });

    let m2: Message = new Message({
      author: user,
      text: 'Bye!',
      thread: thread
    });

    let messagesService: MessagesService = new MessagesService();

    // listen to each message indivdually as it comes in
    messagesService.newMessages
      .subscribe( (message: Message) => {
        console.log('=> newMessages: ' + message.text);
      });

    // listen to the stream of most current messages
    messagesService.messages
      .subscribe( (messages: Message[]) => {
        console.log('=> messages: ' + messages.length);
      });

    messagesService.addMessage(m1);
    messagesService.addMessage(m2);

    // => messages: 1
    // => newMessages: Hi!
    // => messages: 2
    // => newMessages: Bye!
  });


});
