import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddUpdateFormComponent } from './add-update-form.component';

describe('AddUpdateFormComponent', () => {
  let component: AddUpdateFormComponent;
  let fixture: ComponentFixture<AddUpdateFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
