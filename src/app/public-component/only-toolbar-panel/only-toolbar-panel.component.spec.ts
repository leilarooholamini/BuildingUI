import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyToolbarPanelComponent } from './only-toolbar-panel.component';

describe('OnlyToolbarPanelComponent', () => {
  let component: OnlyToolbarPanelComponent;
  let fixture: ComponentFixture<OnlyToolbarPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlyToolbarPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyToolbarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
