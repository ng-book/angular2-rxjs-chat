import {MessagesService, ThreadsService} from '../../app/ts/services/services';
import {Message, User, Thread} from '../../app/ts/models';
import * as _ from 'underscore';

describe('ThreadsService', () => {
  it('should collect the Threads from Messages', () => {

    let nate: User = new User('Nate Murray', '');
    let felipe: User = new User('Felipe Coury', '');

    let t1: Thread = new Thread('t1', 'Thread 1', '');
    let t2: Thread = new Thread('t2', 'Thread 2', '');

    let m1: Message = new Message({
      author: nate,
      text: 'Hi!',
      thread: t1
    });

    let m2: Message = new Message({
      author: felipe,
      text: 'Where did you get that hat?',
      thread: t1
    });

    let m3: Message = new Message({
      author: nate,
      text: 'Did you bring the briefcase?',
      thread: t2
    });

    let messagesService: MessagesService = new MessagesService();
    let threadsService: ThreadsService = new ThreadsService(messagesService);

    threadsService.threads
      .subscribe( (threadIdx: { [key: string]: Thread }) => {
        let threads: Thread[] = _.values(threadIdx);
        let threadNames: string = _.map(threads, (t: Thread) => t.name)
                                   .join(', ');
        console.log(`=> threads (${threads.length}): ${threadNames} `);
      });

    messagesService.addMessage(m1);
    messagesService.addMessage(m2);
    messagesService.addMessage(m3);

    // => threads (1): Thread 1
    // => threads (1): Thread 1
    // => threads (2): Thread 1, Thread 2

  });
});
