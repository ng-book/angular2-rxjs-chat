import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatThreadComponent } from './chat-thread.component';

xdescribe('ChatThreadComponent', () => {
  let component: ChatThreadComponent;
  let fixture: ComponentFixture<ChatThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
