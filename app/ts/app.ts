/// <reference path="../typings/app.d.ts" />

/*
 * Angular
 */
import {Component, bootstrap, View} from "angular2/angular2";

/*
 * Components
 */
import {ChatNavBar} from "./components/ChatNavBar";
import {ChatThreads} from "./components/ChatThreads";
import {ChatWindow} from "./components/ChatWindow";

// /*
//  * Injectables
//  */
import {servicesInjectables} from "./services/services";
import {utilInjectables} from "./util/util";

// /*
//  * Services
//  */
import {MessagesService, ThreadsService, UserService} from "./services/services";
import {ChatExampleData} from "./ChatExampleData";

// /*
//  * Webpack
//  */

require("css/styles.scss");

@Component({
  selector: "chat-app"
})
@View({
  directives: [ChatNavBar,
               ChatThreads,
               ChatWindow],
  template: `
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <chat-threads></chat-threads>
      <chat-window></chat-window>
    </div>
  </div>
  `
})
class ChatApp {
  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public userService: UserService) {
    ChatExampleData.init(messagesService, threadsService, userService);

  }
}

bootstrap(ChatApp, [ servicesInjectables, utilInjectables ]);

