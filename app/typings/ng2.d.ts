declare module "angular2/core" {
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

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
