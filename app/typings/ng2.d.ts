declare module "angular2/pipes" {
  class AsyncPipe {
    constructor(ref?: any);
    _latestValue: any;
    _latestReturnedValue: any;
    _subscription: any;
    _obj: any;
    onDestroy(): void;
    transform(obj: any, args: any[]): any;
    _subscribe(obj: any): void;
    _selectStrategy(obj: any): any;
    _dispose(): void;
    _updateLatestValue(async: any, value: Object);
  }
}

