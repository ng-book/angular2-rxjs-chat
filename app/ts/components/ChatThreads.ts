/// <reference path="../../typings/app.d.ts" />
import {Component, View, NgFor, NgIf,
        LifecycleEvent} from "angular2/angular2";
import {ThreadsService} from "../services/services";
import {RxPipe} from "../util/RxPipe";
import * as Rx from "rx";
import {Thread} from "models";

@Component({
  lifecycle: [ LifecycleEvent.onInit ],
  properties: ["thread"],
  selector: "chat-thread"
})
@View({
  directives: [NgIf],
  template: `
  <div class="media conversation">
    <div class="pull-left">
      <img class="media-object avatar" 
           src="{{thread.avatarSrc}}">
    </div>
    <div class="media-body">
      <h5 class="media-heading contact-name">{{thread.name}}
        <span *ng-if="selected">&bull;</span>
      </h5>
      <small class="message-preview">{{thread.lastMessage.text}}</small>
    </div>
    <a (click)="clicked($event)" class="div-link">Select</a>
  </div>
  `
})
class ChatThread {
  thread: Thread;
  selected: boolean = false;

  constructor(public threadsService: ThreadsService) {
  }

  onInit(): void {
    this.threadsService.currentThread
      .subscribe( (currentThread: Thread) => {
        this.selected = currentThread &&
          this.thread &&
          (currentThread.id === this.thread.id);
      });
  }

  clicked(event: any): void {
    this.threadsService.setCurrentThread(this.thread);
    event.preventDefault();
  }
}


@Component({
  selector: "chat-threads"
})
@View({
  directives: [NgFor, ChatThread],
  pipes: [RxPipe],
  template: `
    <!-- conversations -->
    <div class="row">
      <div class="conversation-wrap">

        <chat-thread
             *ng-for="#thread of threads | rx"
             [thread]="thread">
        </chat-thread>

      </div>
    </div>
  `
})
export class ChatThreads {
  threads: Rx.Observable<any>;

  constructor(public threadsService: ThreadsService) {
    this.threads = threadsService.orderedThreads;
  }
}
