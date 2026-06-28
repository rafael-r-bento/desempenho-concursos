import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamDialog } from './add-exam-dialog';

describe('AddExamDialog', () => {
  let component: AddExamDialog;
  let fixture: ComponentFixture<AddExamDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExamDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExamDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
