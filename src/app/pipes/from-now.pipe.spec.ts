import { FromNowPipe } from './from-now.pipe';

xdescribe('FromNowPipe', () => {
  it('create an instance', () => {
    const pipe = new FromNowPipe();
    expect(pipe).toBeTruthy();
  });
});
