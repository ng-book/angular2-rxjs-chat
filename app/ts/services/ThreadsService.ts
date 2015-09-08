/// <reference path="../../typings/app.d.ts" />
import {Injectable, bind} from "angular2/angular2";
import * as Rx from "rx";
import {Thread, Message} from "models";
import {MessagesService} from "MessagesService";
import * as _ from "underscore";

@Injectable()
export class ThreadsService {

  // `threads` is a observable that contains the most up to date list of threads
  threads: Rx.Observable<{ [key: string]: Thread }>;

  // `orderedThreads` contains a newest-first chronological list of threads
  orderedThreads: Rx.Observable<Thread[]>;

  // `currentThread` contains the currently selected thread
  currentThread: Rx.Subject<Thread> =
    new Rx.BehaviorSubject<Thread>(new Thread());

  // `currentThreadMessages` contains the set of messages for the currently
  // selected thread
  currentThreadMessages: Rx.Observable<Message[]>;

  constructor(public messagesService: MessagesService) {

    this.threads = messagesService.messages
      .map( (messages: Message[]) => {
        let threads: {[key: string]: Thread} = {};
        // Store the message's thread it in our accumulator `threads`
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] ||
            message.thread;

          // Cache the most recent message for each thread
          let messagesThread: Thread = threads[message.thread.id];
          if (!messagesThread.lastMessage ||
              messagesThread.lastMessage.sentAt < message.sentAt) {
            messagesThread.lastMessage = message;
          }
        });
        return threads;
      })
      // share this stream across multiple subscribers and makes sure everyone
      // receives the current list of threads when they first subscribe
      .shareReplay(1);

    this.orderedThreads = this.threads
      .map((threadGroups: { [key: string]: Thread }) => {
        let threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
      })
      .shareReplay(1);

    this.currentThreadMessages = this.currentThread
      .combineLatest(messagesService.messages,
                     (currentThread: Thread, messages: Message[]) => {
        if (currentThread && messages.length > 0) {
          return _.chain(messages)
            .filter((message: Message) =>
                    (message.thread.id === currentThread.id))
            .map((message: Message) => {
              message.isRead = true;
              return message; })
            .value();
        } else {
          return [];
        }
      })
      .shareReplay(1);

    this.currentThread.subscribe(this.messagesService.markThreadAsRead);

  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.onNext(newThread);
  }

}

export var threadsServiceInjectables: Array<any> = [
  bind(ThreadsService).toClass(ThreadsService)
];
