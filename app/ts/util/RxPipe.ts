/// <reference path="../../typings/app.d.ts" />
/* tslint:disable:max-line-length */
/**
 * Creates a pipe suitable for a RxJS observable:
 *
 *         @View({
 *           template: '{{ someObservable | rx}}'
 *           pipes: [RxPipe]
 *         })
 *
 * Originally written by @gdi2290 but updated for 2.0.0.alpha-35 and use AsyncPipe
 * (Soon the Angular team will be using RxJS natively and this pipe will be
 * unnecessary because we'll be able to use the `async` pipe.)
 *
 * References:
 * * rxPipeRegistry.ts https://gist.github.com/gdi2290/e9b2880a1d13057197d7 by @gdi2290
 * * AsyncPipe https://github.com/angular/angular/blob/master/modules/angular2/src/pipes/async_pipe.ts
 *
 * @class
 */
import {Pipe, bind, ChangeDetectorRef} from "angular2/angular2";
import {AsyncPipe} from "angular2/pipes";
import {Observable} from "rx";

function isObservable(obs: any): boolean {
  return obs && typeof obs.subscribe === "function";
}

class RxStrategy {
  createSubscription(async: any, updateLatestValue: any): any {
    return async.subscribe(updateLatestValue, (e: Error) => { throw e; });
  }
  dispose(subscription: any): void { subscription.dispose(); }
  onDestroy(subscription: any): void { subscription.dispose(); }
}

let _rxStrategy: RxStrategy = new RxStrategy();

@Pipe({name: "rx"})
export class RxPipe extends AsyncPipe {
  constructor(public _ref: ChangeDetectorRef) { super(_ref); }

  supports(obs: any): boolean { return isObservable(obs); }

  _selectStrategy(obj: Observable<any>): any {
    return _rxStrategy;
  }
}

export var rxPipeInjectables: Array<any> = [
  bind(RxPipe).toValue(RxPipe)
];
