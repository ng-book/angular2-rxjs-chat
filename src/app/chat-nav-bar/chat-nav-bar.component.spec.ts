import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNavBarComponent } from './chat-nav-bar.component';

xdescribe('ChatNavBarComponent', () => {
  let component: ChatNavBarComponent;
  let fixture: ComponentFixture<ChatNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
