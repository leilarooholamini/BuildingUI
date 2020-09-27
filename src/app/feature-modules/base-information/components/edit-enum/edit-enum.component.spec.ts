import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnumComponent } from './edit-enum.component';

describe('EditEnumComponent', () => {
  let component: EditEnumComponent;
  let fixture: ComponentFixture<EditEnumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEnumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
