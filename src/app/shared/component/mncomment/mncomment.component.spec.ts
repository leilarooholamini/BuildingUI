import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MNCommentComponent } from './mncomment.component';

describe('MNCommentComponent', () => {
  let component: MNCommentComponent;
  let fixture: ComponentFixture<MNCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MNCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MNCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
