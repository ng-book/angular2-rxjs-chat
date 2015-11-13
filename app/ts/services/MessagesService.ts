/// <reference path="../../typings/app.d.ts" />
import {Injectable, bind} from "angular2/angular2";
import * as Rx from "@reactivex/rxjs";
import {User, Thread, Message} from "../models";

let initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {
  // a stream that publishes new messages only once
  newMessages: Rx.Subject<Message> = new Rx.Subject<Message>();

  // `messages` is a stream that emits an array of the most up to date messages
  messages: Rx.Observable<Message[]>;

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently 
  // stored in `messages`)
  updates: Rx.Subject<any> =
    new Rx.Subject<any>();

  // action streams
  create: Rx.Subject<Message> = new Rx.Subject<Message>();
  markThreadAsRead: Rx.Subject<any> = new Rx.Subject<any>();

  constructor() {
    this.messages = this.updates
      // watch the updates and accumulate operations on the messages
      .scan((messages: Message[],
              operation: IMessagesOperation) => {
        return operation(messages);
              }, initialMessages)
      // make sure we can share the most recent list of messages across anyone
      // who's interested in subscribing and cache the last known list of
      // messages
      .shareReplay(1, Number.POSITIVE_INFINITY);
      // .shareReplay(1);

    // `create` takes a Message and then puts an operation (the inner function)
    // on the `updates` stream to add the Message to the list of messages.
    //
    // That is, for each item that gets added to `create` (by using `next`)
    // this stream emits a concat operation function.
    //
    // Next we subscribe `this.updates` to listen to this stream, which means
    // that it will receive each operation that is created
    //
    // Note that it would be perfectly acceptable to simply modify the
    // "addMessage" function below to simply add the inner operation function to
    // the update stream directly and get rid of this extra action stream
    // entirely. The pros are that it is potentially clearer. The cons are that
    // the stream is no longer composable.
    this.create
      .map( function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      })
      .subscribe(this.updates);

    this.newMessages
      .subscribe(this.create);

    // similarly, `markThreadAsRead` takes a Thread and then puts an operation
    // on the `updates` stream to mark the Messages as read
    this.markThreadAsRead
      .map( (thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map( (message: Message) => {
            // note that we're manipulating `message` directly here. Mutability
            // can be confusing and there are lots of reasons why you might want
            // to, say, copy the Message object or some other 'immutable' here
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
      })
      .subscribe(this.updates);

  }

  // an imperative function call to this action stream
  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User): Rx.Observable<Message> {
    return this.newMessages
      .filter((message: Message) => {
               // belongs to this thread
        return (message.thread.id === thread.id) &&
               // and isn't authored by this user
               (message.author.id !== user.id);
      });
  }
}

export var messagesServiceInjectables: Array<any> = [
  bind(MessagesService).toClass(MessagesService)
];
