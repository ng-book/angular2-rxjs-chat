/// <reference path="../../typings/app.d.ts" />
import {Component, View, LifecycleEvent} from "angular2/angular2";
import {MessagesService, ThreadsService} from "../services/services";
import {Message, Thread} from "models";
import * as _ from "underscore";

@Component({
  lifecycle: [ LifecycleEvent.onInit ],
  selector: "nav-bar"
})
@View({
  directives: [],
  template: `
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="https://ng-book.com/2">
          <img src="${require("images/logos/ng-book-2-minibook.png")}"></img> ng-book 2
        </a>
      </div>
      <p class="navbar-text navbar-right">
        <button class="btn btn-primary" type="button">
          Messages <span class="badge">{{unreadMessagesCount}}</span>
        </button>
      </p>
    </div>
  </nav>

  `
})
export class ChatNavBar {
  unreadMessagesCount: number;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService) {
  }

  onInit(): void {
    this.messagesService.messages
      .combineLatest(
        this.threadsService.currentThread,
        (messages: Message[], currentThread: Thread) =>
          [currentThread, messages] )

      .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
        this.unreadMessagesCount =
          _.reduce(
            messages,
            (sum: number, m: Message) => {
              let messageIsInCurrentThread: boolean = m.thread &&
                currentThread &&
                (currentThread.id === m.thread.id);
              if (m && !m.isRead && !messageIsInCurrentThread) {
                sum = sum + 1;
              }
              return sum;
            },
            0);
      });
  }
}

