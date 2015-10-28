/// <reference path="../../typings/app.d.ts" />
import {Component, View, NgFor, NgIf, NgClass, LifecycleEvent,
        FORM_DIRECTIVES, ElementRef} from "angular2/angular2";
import {MessagesService,
        ThreadsService,
        UserService} from "../services/services";
import {RxPipe} from "../util/RxPipe";
import {FromNowPipe} from "../util/FromNowPipe";
import * as Rx from "rx";
import {User, Thread, Message} from "../models";

@Component({
  lifecycle: [ LifecycleEvent.onInit ],
  properties: ["message"],
  selector: "chat-message"
})
@View({
  directives: [NgIf,
               NgClass],
  pipes: [FromNowPipe],
  template: `
  <div class="msg-container"
       [ng-class]="{'base-sent': !incoming, 'base-receive': incoming}">

    <div class="avatar"
         *ng-if="!incoming">
      <img src="{{message.author.avatarSrc}}">
    </div>

    <div class="messages"
      [ng-class]="{'msg-sent': !incoming, 'msg-receive': incoming}">
      <p>{{message.text}}</p>
      <time>{{message.sender}} • {{message.sentAt | fromNow}}</time>
    </div>

    <div class="avatar"
         *ng-if="incoming">
      <img src="{{message.author.avatarSrc}}">
    </div>
  </div>
  `
})
export class ChatMessage {
  message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(public userService: UserService) {
  }

  onInit(): void {
    this.userService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
          if (this.message.author && user) {
            this.incoming = this.message.author.id !== user.id;
          }
        });
  }

}

@Component({
  lifecycle: [ LifecycleEvent.onInit ],
  selector: "chat-window"
})
@View({
  directives: [NgFor,
               ChatMessage,
               FORM_DIRECTIVES],
  pipes: [RxPipe],
  template: `
    <div class="chat-window-container">
      <div class="chat-window">
        <div class="panel-container">
          <div class="panel panel-default">

            <div class="panel-heading top-bar">
              <div class="panel-title-container">
                <h3 class="panel-title">
                  <span class="glyphicon glyphicon-comment"></span>
                  Chat - {{currentThread.name}}
                </h3>
              </div>
              <div class="panel-buttons-container">
                <!-- you could put minimize or close buttons here -->
              </div>
            </div>

            <div class="panel-body msg-container-base">
              <chat-message
                   *ng-for="#message of messages | rx"
                   [message]="message">
              </chat-message>
            </div>

            <div class="panel-footer">
              <div class="input-group">
                <input type="text" 
                       class="chat-input"
                       placeholder="Write your message here..."
                       (keydown.enter)="onEnter($event)"
                       [(ng-model)]="draftMessage.text" />
                <span class="input-group-btn">
                  <button class="btn-chat"
                     (click)="onEnter($event)"
                     >Send</button>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class ChatWindow {
  messages: Rx.Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public userService: UserService,
              public el: ElementRef) {
  }

  onInit(): void {
    this.messages = this.threadsService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });

    this.userService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        });

    this.messages
      .subscribe(
        (messages: Array<Message>) => {
          setTimeout(() => {
            this.scrollToBottom();
          });
        });
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    let m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el
      .nativeElement.querySelector(".msg-container-base");
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
