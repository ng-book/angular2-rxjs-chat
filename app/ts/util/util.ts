import {rxPipeInjectables} from "./RxPipe";
import {fromNowPipeInjectables} from "./FromNowPipe";

export var utilInjectables: Array<any> = [
  rxPipeInjectables,
  fromNowPipeInjectables
];

