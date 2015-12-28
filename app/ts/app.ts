/**
 * Copyright 2016, Fullstack.io, LLC.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import {
  Component
} from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';

/*
 * Components
 */
// import {ChatNavBar} from './components/ChatNavBar';
// import {ChatThreads} from './components/ChatThreads';
// import {ChatWindow} from './components/ChatWindow';

/*
 * Injectables
 */
import { servicesInjectables } from './services/services';

// import {utilInjectables} from './util/util';

/*
 * Services
 */
import {MessagesService, UserService} from './services/services';
// import {MessagesService, ThreadsService, UserService} from './services/services';
// import {ChatExampleData} from './ChatExampleData';

/*
 * Webpack
 */
require('../css/styles.scss');

// 
require('./services/services');

@Component({
  selector: 'chat-app',
  // directives: [ChatNavBar,
  //              ChatThreads,
  //              ChatWindow],
  template: `
  <div>
    Hi :) nom
    <nav-bar></nav-bar>
    <div class="container">
      <chat-threads></chat-threads>
      <chat-window></chat-window>
    </div>
  </div>
  `
})
class ChatApp {
  // constructor(public messagesService: MessagesService,
  //             public threadsService: ThreadsService,
  //             public userService: UserService) {
  //   ChatExampleData.init(messagesService, threadsService, userService);

  // }
}

// bootstrap(ChatApp, [ servicesInjectables, utilInjectables ]);

bootstrap(ChatApp);
